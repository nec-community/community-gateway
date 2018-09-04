import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDelegates, becomeDelegate } from '../../actions/delegateActions';
import './DelegateVotes.scss';
import '../Submit/Submit.scss';

class DelegateVotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitDelegate = this.submitDelegate.bind(this);
  }

  componentDidMount() {
    this.props.getDelegates();
  }

  submitDelegate() {
    this.props.becomeDelegate(this.state.description);
  }

  chooseDelegate() {
    return true;
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      delegates,
    } = this.props;

    return (
      <div className="delegates">
        <div className="container">
          <h1>Delegates</h1>
          <p className="page-description">
            The Ethfinex Voting token makes voting power liquid, dissociable for different topics, and allows it to be transferred. <br />
            This has made it possible to implement a basic form of <a href="https://en.wikipedia.org/wiki/Delegative_democracy" target="_blank">liquid democracy</a>.
          </p>
        </div>
        <div className="delegate-section form-wrapper">
          <div className="container">
            <h2 className="small-title">
              Allow others to delegate their vote to you
            </h2>
            <p className="section-description">
              The delegates section enables you put yourself forward
              to represent the interests of other community members. For example,
              you can choose to nominate yourself as a delegate who's policy is
              to vote each round for whichever token has highest trading volume on other exchanges.
            </p>
            <textarea
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              required
              placeholder="'I solemnly swear to represent the interests of those who place trust in me by voting for...'"
            />
            <div className="submit-wrapper">
              <button onClick={this.submitDelegate}>Stand as a representative</button>
            </div>
          </div>
        </div>
        <div className="votes-section form-wrapper">
          <div className="container">
            <div className="small-title">
              Delegate your vote
            </div>
            <p className="section-description">
              If you prefer not to participate in every token listing vote as a Nectar token holder you can choose a delegate who best represents your interests. <br />
              At any time you may withdraw your delegation to take control of your own voting tokens.
            </p>

            {
              delegates.map(delegate => (
                <div className="single-delegate">
                  <div className="delegate-information">
                    <p className="delegate-address">
                      {delegate.user}
                    </p>
                    <p className="delegate-mission">
                      {delegate.description}
                    </p>
                  </div>
                  <div className="vote-for-delegate submit-wrapper">
                    <button onClick={this.chooseDelegate}>Choose delegate</button>

                    {/*<div className="checkbox-text">*/}
                      {/*<label className="checkbox">*/}
                        {/*<input type="checkbox" value="value" onChange={this.handleInputChange} />*/}
                        {/*<span className="label"></span>*/}
                      {/*</label>*/}
                      {/*Delegate all future votes*/}
                    {/*</div>*/}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

DelegateVotes.propTypes = {
  getDelegates: PropTypes.func.isRequired,
  delegates: PropTypes.array.isRequired,
  becomeDelegate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  delegates: state.delegate.delegates,
});

export default connect(mapStateToProps, {
  getDelegates,
  becomeDelegate,
})(DelegateVotes);
