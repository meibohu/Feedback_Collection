//css
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  //figure out if I'm logged in.
  renderContent() {
    switch (this.props.auth) {
      case null:
        // return 'Still deciding';
        return;
      case false:
        // return 'im logged out';
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:   //return array
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }
  render() {
    // console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo">
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }

}

//in reducers/index.js
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
