import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Proposal.scss';

class Proposal extends Component {
  componentDidMount() {}
  render() {
    const { match: { params: { proposalId } } } = this.props;
    return (
      <div>
        <h1>Proposal with ID { proposalId }</h1>
      </div>
    );
  }
}

Proposal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      proposalId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Proposal);
