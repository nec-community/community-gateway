import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getDelegates,
  becomeDelegate,
  delegateVote,
  getMyDelegate,
  undelegate,
} from '../../actions/delegateActions';
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
    this.delegateVote = this.delegateVote.bind(this);
    this.undelegateVote = this.undelegateVote.bind(this);
  }

  componentDidMount() {
    this.props.getMyDelegate();
    this.props.getDelegates();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.account !== this.props.account) this.props.getMyDelegate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.delegates !== this.props.delegates)
      this.props.delegates.forEach(delegate => this.formatDescription(delegate.user))
  }

  async submitDelegate() {
    await this.props.becomeDelegate(this.state.description);
    this.props.getDelegates();
  }

  async delegateVote(to) {
    await this.props.delegateVote(to);
    this.props.getMyDelegate();
  }

  async undelegateVote() {
    await this.props.undelegate();
    this.props.getMyDelegate();
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  formatDescription(id) {
    var text = document.getElementById(`delegate-description-${id}`).innerHTML;
    text = text.replace(new RegExp('https?:\\/\\/[a-zA-Z0-9_\\-.\\/#%:=?&\']+', 'g'), '<a rel="noopener noreferrer" target="_blank" href="$&">$&</a>');
    document.getElementById(`delegate-description-${id}`).innerHTML = text;
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
          <div className="container flex">
            <img src="/images/delegate-icon.svg" alt="" />
            <div>
              <h2 className="small-title">
                Allow others to delegate their vote to you
              </h2>
              <p className="section-description">
                The delegates section enables you put yourself forward
                to represent the interests of other community members. For example,
                you can choose to nominate yourself as a delegate who's policy is
                to vote each round for whichever token has highest trading volume on other
                exchanges.
              </p>
              {
                !this.props.userHasVoted &&
                <div>
                  <textarea
                    name="description"
                    id="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    required
                    placeholder="'I solemnly swear to represent the interests of those who place trust in me by voting for...'"
                  />
                  <div className="submit-wrapper">
                    <button onClick={this.submitDelegate} disabled={this.props.userHasVoted}>
                      Stand as a representative
                    </button>
                  </div>
                </div>
              }
              {
                this.props.userHasVoted &&
                <p className="info-tip undelegate">
                  You've already voted in this round - you can not become a delegate at the moment.
                </p>
              }
            </div>
          </div>
        </div>
        <div className="votes-section form-wrapper">
          <div className="container flex">
            <img src="/images/delegators-icon.svg" alt="" />
            <div>
              <div className="small-title">
                Delegate your vote
              </div>
              <p className="section-description">
                If you prefer not to participate in every token listing vote as a Nectar token
                holder you can choose a delegate who best represents your interests. <br />
                At any time you may withdraw your delegation to take control of your own voting
                tokens.
              </p>

              {
                this.props.userHasVoted &&
                <p className="info-tip undelegate">
                  You've already voted in this round - you can not change your delegate at the moment.
                </p>
              }

              {
                this.props.myDelegate !== '0x0000000000000000000000000000000000000000' &&
                <p className="info-tip undelegate">
                  You've delegated your vote to {this.props.myDelegate}.
                  <br />
                  <a onClick={() => this.undelegateVote()}>Undelegate vote</a>
                </p>
              }

              {
                delegates.length === 0 && <p>No delegates</p>
              }

              {
                delegates.map(delegate => (
                  <div className="single-delegate" key={delegate.user}>
                    <div className="delegate-information">
                      <p className="delegate-address">
                        {delegate.user}
                      </p>
                      <p className="delegate-mission" id={`delegate-description-${delegate.user}`}>
                        {delegate.description}
                      </p>
                    </div>
                    <div className="vote-for-delegate submit-wrapper">
                      <button
                        onClick={() => this.delegateVote(delegate.user)}
                        disabled={this.props.userHasVoted}
                      >
                        Choose delegate
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
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
  delegateVote: PropTypes.func.isRequired,
  undelegate: PropTypes.func.isRequired,
  getMyDelegate: PropTypes.func.isRequired,
  userHasVoted: PropTypes.bool.isRequired,
  myDelegate: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  delegates: state.delegate.delegates,
  myDelegate: state.delegate.myDelegate,
  userHasVoted: state.delegate.userHasVoted,
  account: state.account.account,
});

export default connect(mapStateToProps, {
  getDelegates,
  becomeDelegate,
  delegateVote,
  undelegate,
  getMyDelegate,
})(DelegateVotes);
