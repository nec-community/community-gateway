/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { countWheels } from './scrollHelper';

import CircleButton from './CircleButton';
import { Nec, FeeDiscounts, BuyAndBurn, DaoGovernance, NewListings, Ecosystem } from './sections';

import './Landing.scss';

const buttons = [
  { icon: 'fee', desc: 'Fee discounts' },
  { icon: 'buy', desc: 'Buy & Burn' },
  { icon: 'dao', desc: `DAO governance` },
  { icon: 'listings', desc: 'New listings' },
  { icon: 'exchanges', desc: 'Ecosystem' },
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
  listings: {
    component: NewListings,
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
  'New listings',
  'Ecosystem',
];

class Landing extends Component {
  state = {
    activeTab: 'nec',
    isScrollBlocked: false,
    tradingVolume: 0,
  };

  controller = new AbortController();

  componentDidMount() {
    const { history } = this.props;

    window.addEventListener('wheel', this.slideContent, {
      passive: false,
    });
    this.unlistenHistoryChange = history.listen(this.historyChange);

    fetch('https://api.deversifi.com/api/v1/last24HoursVolume', {
      method: 'GET',
      mode: 'cors',
      signal: this.controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        if (!isNaN(data?.TotalUSDValue))
          this.setState({
            tradingVolume: data?.TotalUSDValue,
          });
      })
      .catch(e => console.log('Error ', e));
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.slideContent);
    this.unlistenHistoryChange();
    clearTimeout(this.blockerTimeout);
    this.controller.abort();
  }

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
      this.unblockScroll
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

  historyChange = () => {
    window.removeEventListener('wheel', this.slideContent);
  };

  unblockScroll = () => {
    this.blockerTimeout = setTimeout(
      () =>
        this.setState({
          isScrollBlocked: false,
        }),
      1000
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
      this.unblockScroll
    );
  };

  render() {
    const { activeTab, tradingVolume } = this.state;

    const tabsArray = Object.keys(tabs);
    const ActiveTabComponent = tabs[activeTab].component;
    const pageNumber = tabsArray.length;
    const currentPage = tabsArray.findIndex(tab => tab === activeTab);

    return (
      <div className="landing__wrapper">
        <div className="landing__background">
          {tabsArray.map(tab => (
            <picture key={tab}>
              <source
                srcSet={`/images/landingBackgrounds/${
                  tab === 'listings' ? 'fee' : tab
                }-bg@2x.png 2x`}
              />
              <img
                src={`/images/landingBackgrounds/${tab === 'listings' ? 'fee' : tab}-bg.png`}
                alt=""
                className={`landing__background-image ${
                  tab === activeTab ? 'landing__background-image--active' : ''
                }`}
              />
            </picture>
          ))}
        </div>
        <div className="landing__left-column" />
        <div className="landing__central-column">
          <div className="landing__central-column-borders" />
          <ActiveTabComponent tradingVolume={activeTab === 'buy' ? tradingVolume : null} />
          <div className="landing__central-column-borders landing__central-column-borders--bottom">
            {currentPage < tabsNames.length - 1 ? (
              <div className="central-column-borders__wrapper">
                <img
                  className="central-column-borders__badge"
                  src="/images/landingIcons/badge.svg"
                  alt=""
                />
                <span className="central-column-borders__text">
                  {`${currentPage + 1} / ${pageNumber - 1} - ${tabsNames[currentPage + 1]}`}
                </span>
              </div>
            ) : null}
            {currentPage > 0 ? (
              <div className="central-column-borders__wrapper">
                <img
                  className="central-column-borders__badge central-column-borders__badge--invert"
                  src="/images/landingIcons/badge.svg"
                  alt=""
                />
                <span className="central-column-borders__text">
                  {`${currentPage - 1} / ${pageNumber - 1} - ${tabsNames[currentPage - 1]}`}
                </span>
              </div>
            ) : null}
          </div>
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
                    NEC
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
