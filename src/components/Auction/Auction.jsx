import React, { Component } from 'react';
import Web3 from 'web3';
import './Auction.scss';
import Diagram from './Diagrams/Diagram';
import abis from '../../constants/abis.json';
import config from '../../constants/config.json';
import { convertToken } from '../../actions/traderAction';
import Circle from './Diagrams/Circle';
import BarDiagram from './Diagrams/BarDiagram';

const TABS = [
  {
    name: 'Circulating NEC',
    titleAmount: 100,
    Component: Diagram,
    data: [
      {
        name: 'Page A',
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        pv: 4300,
        amt: 2100,
      },
    ],
  },
  {
    name: 'Burned NEC',
    titleAmount: 50,
    Component: Diagram,
    data: [
      {
        name: 'Page A',
        pv: 1200,
        amt: 1200,
      },
      {
        name: 'Page B',
        pv: 2398,
        amt: 1210,
      },
      {
        name: 'Page C',
        pv: 8800,
        amt: 3290,
      },
      {
        name: 'Page D',
        pv: 2908,
        amt: 3000,
      },
      {
        name: 'Page E',
        pv: 5800,
        amt: 1181,
      },
      {
        name: 'Page F',
        pv: 4800,
        amt: 1500,
      },
      {
        name: 'Page G',
        pv: 5300,
        amt: 3100,
      },
    ],
  },
  {
    name: 'DeversiFi NEC/ETH Price',
    titleAmount: 140,
    Component: Diagram,
    data: [
      {
        name: 'Page A',
        pv: 3000,
        amt: 2000,
      },
      {
        name: 'Page B',
        pv: 798,
        amt: 2210,
      },
      {
        name: 'Page C',
        pv: 8900,
        amt: 2290,
      },
      {
        name: 'Page D',
        pv: 1908,
        amt: 2000,
      },
      {
        name: 'Page E',
        pv: 4080,
        amt: 2181,
      },
      {
        name: 'Page F',
        pv: 3008,
        amt: 2500,
      },
      {
        name: 'Page G',
        pv: 9300,
        amt: 2100,
      },
    ],
  },
  {
    name: 'Next Auction ETH',
    titleAmount: 70,
    Component: Diagram,
    data: [
      {
        name: 'Page A',
        pv: 5400,
        amt: 2400,
      },
      {
        name: 'Page B',
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        pv: 6800,
        amt: 2290,
      },
      {
        name: 'Page D',
        pv: 9908,
        amt: 2000,
      },
      {
        name: 'Page E',
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        pv: 300,
        amt: 2100,
      },
    ],
  },
];

class Auction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 1,
      convert: 1,
      tokensForSell: '',
    };

    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(config.providerUrl));
    }

    this.engineAddress = config.necEngineContract;
    this.nectarAddress = config.necTokenContract;
  }

  componentDidMount() {
    this.web3.eth.getAccounts().then(res => {
      this.setState(
        {
          account: res[0],
        },
        () => {
          const tokenContract = new this.web3.eth.Contract(abis.necContract, this.nectarAddress, {
            from: this.state.account,
          });
          const engineContract = new this.web3.eth.Contract(
            abis.engineContract,
            this.engineAddress,
            {
              from: this.state.account,
            }
          );

          engineContract.methods
            .getNextAuction()
            .call()
            .then(res =>
              this.setState({
                nextAuctionMs: res[0],
              })
            );
        }
      );
    });

    convertToken('NEC', 'ETH').then(res =>
      this.setState({
        convert: res.toFixed(5),
      })
    );
  }

  onTabClick = index => {
    const { activeTabIndex } = this.state;

    if (index === activeTabIndex) {
      return null;
    }

    this.setState({
      activeTabIndex: index,
    });
  };

  formatNextAuction = () => {
    const { nextAuctionMs } = this.state;

    let minutes = Math.floor((nextAuctionMs / (1000 * 60)) % 60);
    let hours = Math.floor((nextAuctionMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(nextAuctionMs / (1000 * 60 * 60 * 24));

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${days}d ${hours}h ${minutes}m`;
  };

  changeInputValue = e => {
    const { value } = e.target;

    this.setState({
      tokensForSell: value,
    });
  };

  sellTokens = () => {
    const { tokensForSell, account } = this.state;

    const nectarContract = new this.web3.eth.Contract(abis.necContract, this.nectarAddress);

    nectarContract.methods
      .approve(account, tokensForSell)
      .call()
      .then(res => console.log(res));
  };

  render() {
    const { activeTabIndex, tokensForSell } = this.state;
    const ActiveTabComponent = TABS[activeTabIndex].Component;

    return (
      <div className="auction">
        <div className="container">
          <div className="overview">
            <div className="overview__header">
              <h1>necBurn</h1>
              <p>Overview of NEC Auctions</p>
            </div>
            <div className="overview__text">
              <p>
                Once per week DeversiFi exchange trading fees that are pledged to NEC token holders
                are auctioned. NEC holders can sell their NEC in exchange for the auctioned ETH. Any
                NEC tokens sold in the auctions are burned.
              </p>
              <div className="overview__auction">
                <p>
                  Auction: <span className="auction__status">live</span>
                </p>
                <p className="little__text">Next auction start</p>
                <p>{this.formatNextAuction()}</p>
                <p className="little__text">Mon 19th Oct 12pm UST</p>
              </div>
            </div>
          </div>
          <section className="summary">
            <h3>Summary</h3>
            <ul className="tabs">
              {TABS.map((tab, index) => (
                <li key={tab.name}>
                  <button
                    className={`tab__button ${index === activeTabIndex ? 'active__tab' : null}`}
                    onClick={() => this.onTabClick(index)}
                  >
                    <p>{tab.name}</p>
                    <span>{tab.titleAmount}</span>
                    <span className="little__text">1$</span>
                  </button>
                </li>
              ))}
            </ul>
            <ActiveTabComponent tabContent={TABS[activeTabIndex]} />
          </section>
          <section>
            <h3>Current Auction - live</h3>
            <div className="current-auction__info">
              <div className="info__item">
                <p>Sold</p>
                <span>
                  8<span className="little__text">ETH</span>
                </span>
                <span className="little__text">US $1360</span>
              </div>
              <div className="info__item">
                <p>Sold</p>
                <span>
                  24<span className="little__text">kNEC</span>
                </span>
                <span className="little__text">US $0.006m</span>
              </div>
              <div className="info__item">
                <p>Remaining</p>
                <span>
                  17.5<span className="little__text">kNEC</span>
                </span>
                <span className="little__text">~US $850</span>
              </div>
              <div className="info__item">
                <p>Sold NEC Average Price</p>
                <span>
                  0.00035<span className="little__text">NEC</span>
                </span>
                <span className="little__text">US $.055</span>
              </div>
            </div>
            <div className="graphics__container">
              <BarDiagram />
              <Circle />
            </div>
          </section>
          <div className="sell__tokens">
            <span>SELL</span>
            <div className="input__container">
              <input value={tokensForSell} onChange={this.changeInputValue} />
              <span>NEC</span>
            </div>
            <span>FOR</span>
            <div className="input__container">
              <p>{this.state.convert}</p>
              <span>NEC/ETH</span>
            </div>
            <button onClick={this.sellTokens}>SELL</button>
          </div>
          <div className="table__container">
            <table>
              <thead>
                <tr>
                  <th>DATE & TIME</th>
                  <th>TX</th>
                  <th>WALLET ADDRESS</th>
                  <th>NEC</th>
                  <th>ETH</th>
                  <th>PRICE NEC/ETH</th>
                  <th>PRICE NEC/USD</th>
                  <th>USD</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(new Array(5)).map((el, index) => (
                  <tr key={index}>
                    <td>5th Oct 12:05:04</td>
                    <td>789890080</td>
                    <td>0XFC898B18A70CE49579F8D79A32E29928C15B4BC8</td>
                    <td>10,049</td>
                    <td>3.12</td>
                    <td>0.00345</td>
                    <td>0.055</td>
                    <td>552</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Auction;
