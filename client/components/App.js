import React from "react";
import Header from "./Header";

const App = props => {
  return (
    <div>
      <Header />
      <div className="container">{props.children || <h3>Welcome!</h3>}</div>
    </div>
  );
};

export default App;
