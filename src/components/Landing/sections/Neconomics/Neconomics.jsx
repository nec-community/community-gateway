import React from 'react';
import AnimatedNumber from 'animated-number-react';
import eth from '../../../../services/ethereumService';

import './Neconomics.scss';
import { numberWithCommas } from '../../../../services/utils';

class Neconomics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circulatingSupply: 0,
      totalSupply: 0,
      marketCap: 0,
      necPrice: 0,
    };
  }

  async componentWillMount() {
    const { necPrice, totalSupply, marketCap, circulatingSupply } = await eth.getNeconomicsData();
    this.setState({
      necPrice,
      totalSupply,
      marketCap,
      circulatingSupply,
    });
  }

  render() {
    const { necPrice, totalSupply, marketCap, circulatingSupply } = this.state;

    return (
      <section className="landing__section left-aligned">
        <div className="section__title">
          <span>Neconomics</span>
        </div>
        <div className="neconomics__section">
          <div className="separator" />
          <div className="main__text">
            <AnimatedNumber
              value={circulatingSupply}
              duration={750}
              formatValue={numberWithCommas}
            />
          </div>
          <div className="side__text">Circulating supply</div>
        </div>
        <div className="neconomics__section">
          <div className="separator" />
          <div className="main__text">
            <AnimatedNumber
              value={totalSupply}
              duration={750}
              formatValue={numberWithCommas}
            />
          </div>
          <div className="side__text">Total supply</div>
        </div>
        <div className="neconomics__section">
          <div className="separator" />
          <div className="main__text">
            $<AnimatedNumber
              value={marketCap}
              duration={750}
              formatValue={numberWithCommas}
            />
          </div>
          <div className="side__text">Market cap</div>
        </div>
        <div className="neconomics__section">
          <div className="separator" />
          <div className="main__text">
            $<AnimatedNumber
              value={necPrice}
              duration={750}
              formatValue={value => value.toFixed(5)}
            />
          </div>
          <div className="side__text">Token price</div>
        </div>
      </section>
    );
  }
}

export default Neconomics;
