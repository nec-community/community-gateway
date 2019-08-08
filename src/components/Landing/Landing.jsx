/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { countWheels } from './scrollHelper';

import './Landing.scss';

const buttons = [
  { icon: 'fee', desc: 'Fee discounts' },
  { icon: 'exchanges', desc: 'Exchanges' },
  { icon: 'listings', desc: 'New listings' },
  { icon: 'dao', desc: 'DAO governance' },
  { icon: 'buy', desc: 'Buy & Burn' },
];

const tabs = {
  nec: {
    component: () => <div>nec</div>,
  },
  fee: {
    component: () => <div>fee</div>,
  },
  buy: {
    component: () => <div>buy</div>,
  },
  dao: {
    component: () => <div>dao</div>,
  },
  listings: {
    component: () => <div>listings</div>,
  },
  exchanges: {
    component: () => <div>exchanges</div>,
  },
};

class Landing extends Component {
  state = {
    activeTab: 'nec',
    isScrollBlocked: false,
  };

  componentDidMount() {
    const { history } = this.props;

    window.addEventListener('wheel', this.slideContent, {
      passive: false,
    });
    this.unlistenHistoryChange = history.listen(this.historyChange);
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.slideContent);
    this.unlistenHistoryChange();
    clearTimeout(this.blockerTimeout);
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

    this.setState({
      activeTab: tabsArray[nextIndex],
      isScrollBlocked: true,
    });
  };

  slideContent = e => {
    const { isScrollBlocked } = this.state;
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;

    if (!Number.isInteger(deltaY) || !Number.isInteger(deltaX)) {
      return;
    } else {
      e.preventDefault();
    }

    if (isScrollBlocked) {
      return;
    }

    const direction = countWheels(deltaY);

    if (direction === 'top') {
      this.setActiveTabByScroll(1);
      this.unblockScroll();
    }

    if (direction === 'bottom') {
      this.setActiveTabByScroll(-1);
      this.unblockScroll();
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
    const { activeTab } = this.state;

    const ActiveTabComponent = tabs[activeTab].component;
    const pageNumber = Object.keys(tabs).length;
    const currentPage = Object.keys(tabs).findIndex(tab => tab === activeTab);

    return (
      <div className={`landing__wrapper landing__wrapper--${activeTab}`}>
        <div className="landing__left-column">
          {currentPage ? (
            <div className="left-column__page-number-wrapper">
              <span className="left-column__current-page">{currentPage}</span>
              <span className="left-column__page-number">/ {pageNumber - 1}</span>
            </div>
          ) : null}
        </div>
        <div className="landing__central-column">
          <ActiveTabComponent />
        </div>
        <div className="landing__right-column">
          <div className="right-column__circle right-column__circle-1">
            <div className="right-column__circle right-column__circle-2">
              <div className="right-column__circle right-column__circle-3">
                {buttons.map(({ icon, desc }) => (
                  <button
                    key={icon}
                    type="button"
                    name={icon}
                    className={`right-column__circle-button right-column__circle-button-${icon} ${
                      icon === activeTab ? `right-column__circle-button-${icon}--active` : ''
                    }`}
                    onClick={this.onCircleButtonClick}
                  >
                    <div className="circle-button__icon" />
                    <span className="circle-button__name">{desc}</span>
                  </button>
                ))}
                <div className="right-column__circle right-column__circle-4">
                  <button
                    type="button"
                    className={`right-column__circle-button right-column__circle-central-button ${
                      activeTab === 'nec' ? `right-column__circle-central-button--active` : ''
                    }`}
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
