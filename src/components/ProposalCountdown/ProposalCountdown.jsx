import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timeUntilDate } from '../../services/utils';

import './ProposalCountdown.scss';

class ProposalCountdown extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      unit: 'days',
    };
    this.parseETA = this.parseETA.bind(this);
  }
  componentDidMount() {
    this.parseETA();
    setInterval(() => this.parseETA(), 1000);
  }
  parseETA() {
    this.setState({
      ...timeUntilDate(this.props.endTime),
    });
  }
  render() {
    if (this.state.count === 0)
      return (
        <div className="proposal-countdown-wrapper">
          <div className="unit">Finished</div>
        </div>
      );

    return (
      <div className="proposal-countdown-wrapper">
        <div className="number">{this.state.count}</div>
        <div>
          <div className="unit">{this.state.unit}</div>
          <div className="remaining">remaining</div>
        </div>
      </div>
    );
  }
}

ProposalCountdown.propTypes = {
  endTime: PropTypes.object.isRequired,
};

export default ProposalCountdown;
