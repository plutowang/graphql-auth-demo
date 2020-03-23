import React from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import AuthForm from "./AuthForm";
import mutation from "../mutations/Login";
import query from "../queries/CurrentUser";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }
  UNSAFE_componentWillUpdate(nextProps) {
    // this.props the old, current set of props
    // nextProps the next set of props that will be inplace
    // when the components rerenders
    if (!this.props.data.user && nextProps.data.user) {
      // redirext to dashboard
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error =>
          error.message.match(/"(.*?)"/g)
            ? error.message
                .match(/"(.*?)"/g)
                .toString()
                .replace(/['"]+/g, "")
            : error.message
        );
        this.setState(() => ({ errors }));
      });
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(LoginForm));
