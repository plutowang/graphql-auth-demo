import "./style/style.css";

import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { createHttpLink } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/graphql",
    // making request to the same-origin that the browser is
    // currently on,
    // this says it's safe to attempt to send along cookies with
    // the outgoing request
    // it should send cookies whenever it makes a query to the
    // backend server
    credentials: "same-origin"
  }),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/signup" component={SignupForm}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
