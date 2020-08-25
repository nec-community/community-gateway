/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { countWheels } from './scrollHelper';

import CircleButton from './CircleButton';
import TwitterIcon from '../../constants/images/landingIcons/twitter';
import DiscordIcon from '../../constants/images/landingIcons/discord';
import { Nec, FeeDiscounts, BuyAndBurn, DaoGovernance, Neconomics, Ecosystem } from './sections';

import './Landing.scss';

import necLogo from '../App/assets/neclogo.svg';

const buttons = [
  { icon: 'fee', desc: 'Fee discounts' },
  { icon: 'buy', desc: 'Buy & Burn' },
  { icon: 'dao', desc: `DAO governance` },
  { icon: 'neconomics', desc: 'Neconomics' },
  { icon: 'exchanges', desc: 'Trade NEC' },
];

const tabs = {
  nec: {
    component: Nec,
  },
  fee: {
    component: FeeDiscounts,
  },
  buy: {
    component: BuyAndBurn,
  },
  dao: {
    component: DaoGovernance,
  },
  neconomics: {
    component: Neconomics,
  },
  exchanges: {
    component: Ecosystem,
  },
};

const tabsNames = [
  'Welcome',
  'Fee discounts',
  'Buy & Burn',
  'DAO governance',
  'Neconomics',
  'Trade NEC',
];

class Landing extends Component {
  state = {
    activeTab: 'nec',
    isScrollBlocked: false,
    tradingVolume: 0,
    ts: 0,
  };

  controller = new AbortController();

  componentDidMount() {
    const { history } = this.props;

    if ('ontouchstart' in window) {
      window.addEventListener('touchstart', this.handleMobilePos);
      window.addEventListener('touchend', this.handleMobileScroll);
    } else {
      window.addEventListener('wheel', this.slideContent, {
        passive: false,
      });
    }

    this.unlistenHistoryChange = history.listen(this.historyChange);

    fetch('https://api.deversifi.com/v1/trading/r/last24HoursVolume', {
      method: 'GET',
      mode: 'cors',
      signal: this.controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        if (!isNaN(data?.totalUSDVolume))
          this.setState({
            tradingVolume: data?.totalUSDVolume,
          });
      })
      .catch(e => console.log('Error ', e));
  }

  componentWillUnmount() {
    if ('ontouchstart' in window) {
      window.removeEventListener('touchstart', this.handleMobilePos);
      window.removeEventListener('touchend', this.handleMobileScroll);
    } else {
      window.removeEventListener('wheel', this.slideContent);
    }
    this.unlistenHistoryChange();
    clearTimeout(this.blockerTimeout);
    this.controller.abort();
  }

  handleMobilePos = e => {
    this.setState({
      ts: e.touches[0].clientY,
    });
  };

  setActiveTabByScroll = changer => {
    const { activeTab } = this.state;
    const tabsArray = Object.keys(tabs);
    const activeTabIndex = tabsArray.findIndex(tab => tab === activeTab);
    const nextIndex = activeTabIndex + changer;

    if (nextIndex === -1) {
      return;
    }

    if (nextIndex >= tabsArray.length) {
      return;
    }

    this.setState(
      {
        activeTab: tabsArray[nextIndex],
        isScrollBlocked: true,
      },
      this.unblockScroll,
    );
  };

  slideContent = e => {
    const { isScrollBlocked } = this.state;
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;

    if (!Number.isInteger(deltaY) || !Number.isInteger(deltaX)) {
      return;
    }

    e.preventDefault();

    if (isScrollBlocked) {
      return;
    }

    const direction = countWheels(deltaY);

    if (direction === 'top') {
      this.setActiveTabByScroll(1);
    }

    if (direction === 'bottom') {
      this.setActiveTabByScroll(-1);
    }
  };

  handleMobileScroll = e => {
    const te = e.changedTouches[0].clientY;
    if (this.state.ts > te + 5) {
      this.setActiveTabByScroll(1);
    } else if (this.state.ts < te - 5) {
      this.setActiveTabByScroll(-1);
    }
  };

  historyChange = () => {
    if ('ontouchstart' in window) {
      window.removeEventListener('touchstart', this.handleMobilePos);
      window.removeEventListener('touchend', this.handleMobileScroll);
    } else {
      window.removeEventListener('wheel', this.slideContent);
    }
  };

  unblockScroll = () => {
    this.blockerTimeout = setTimeout(
      () =>
        this.setState({
          isScrollBlocked: false,
        }),
      750,
    );
  };

  onCircleButtonClick = e => {
    let name;

    if (e.target.name) {
      name = e.target.name;
    } else if (e.currentTarget.name) {
      name = e.currentTarget.name;
    } else {
      return;
    }

    this.setState(
      {
        activeTab: name,
        isScrollBlocked: true,
      },
      this.unblockScroll,
    );
  };

  render() {
    const { activeTab, tradingVolume } = this.state;

    // const tabsArray = Object.keys(tabs);
    const ActiveTabComponent = tabs[activeTab].component;
    // const pageNumber = tabsArray.length;
    // const currentPage = tabsArray.findIndex(tab => tab === activeTab);

    return (
      <div className="landing__wrapper">
        <div className="landing__dots">
          {Object.keys(tabs).map(tab => (
            <div className={`${tab === activeTab ? 'active' : ''} dot`} />
          ))}
        </div>
        <div className="landing__social">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordIcon />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
        </div>
        <div className="landing__background" />
        <div className="landing__left-column" />
        <div className="landing__central-column">
          <ActiveTabComponent tradingVolume={activeTab === 'buy' ? tradingVolume : null} />
        </div>
        <div className="landing__right-column">
          <div className="right-column__circle right-column__circle-1">
            <div className="right-column__circle right-column__circle-2">
              <div className="right-column__circle right-column__circle-3">
                {buttons.map(({ icon, desc }) => (
                  <CircleButton
                    key={icon}
                    icon={icon}
                    activeTab={activeTab}
                    desc={desc}
                    onCircleButtonClick={this.onCircleButtonClick}
                  />
                ))}
                <div className="right-column__circle right-column__circle-4">
                  <button
                    type="button"
                    name="nec"
                    className={`right-column__circle-button right-column__circle-central-button ${
                      activeTab === 'nec' ? `right-column__circle-central-button--active` : ''
                      }`}
                    onClick={this.onCircleButtonClick}
                  >
                    <img src={necLogo} alt="logo" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
