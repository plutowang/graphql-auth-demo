import React from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import query from "../queries/CurrentUser";

export default WrappedComponent => {
  class RequireAuth extends React.Component {
    componentDidMount() {
      if (!this.props.data.loading && !this.props.data.user) {
        hashHistory.push("/login");
      }
    }
    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push("/login");
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(query)(RequireAuth);
};
