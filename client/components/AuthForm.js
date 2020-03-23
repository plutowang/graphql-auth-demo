import React, { useState, useEffect } from "react";

const AuthForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    setErrors([...props.errors]);
  }, [props.errors]);
  useEffect(() => {
    setErrors([]);
  }, [email, password]);
  return (
    <div className="row">
      <form
        className="col s5"
        onSubmit={() => props.onSubmit({ email, password })}
      >
        <div className="input-field">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="errors">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
