import React from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";

import query from "../queries/CurrentUser";
import mutation from "../mutations/Logout";

class Header extends React.Component {
  onLogout() {
    this.props.mutate({}).then(() => this.props.data.refetch());
    // hashHistory.push("/");
  }
  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <a
              className="waves-effect waves-light btn-small"
              onClick={() => this.onLogout()}
            >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/signup" className="waves-effect waves-light btn-small">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="waves-effect waves-light btn-small">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper deep-purple">
          <Link to="/" className="brand-logo left">
            <i className="material-icons">account_balance</i>
            AuthDemo
          </Link>
          {this.renderButtons()}
        </div>
      </nav>
    );
  }
}

export default graphql(query)(graphql(mutation)(Header));
