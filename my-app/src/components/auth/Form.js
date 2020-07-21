  
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { StyledForm } from "../styled-components";

const Form = ({ handleSubmit, errors }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    const title = location.pathname === "/login" ? "Login" : "Signup";
    setTitle(title);
  }, [location.pathname]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit(credentials);
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <h1>{title}</h1>
      {errors && <div className="alert danger">{errors}</div>}
      <div className="field">
        <input
          onChange={handleChange}
          value={credentials.username}
          type="text"
          name="username"
          placeholder="danJoe258"
          required
        />
        <label>Username</label>
      </div>
      <div className="field">
        <input
          onChange={handleChange}
          value={credentials.password}
          type="password"
          name="password"
          placeholder="********"
          required
        />
        <label>Password</label>
      </div>
      <div className="form-footer">
        <button className="btn btn-primary">{title}</button>
        {location.pathname === "/signup" ? (
          <Link to="/login">I have an account, Login</Link>
        ) : (
          <Link to="/signup">Create an account</Link>
        )}
      </div>
    </StyledForm>
  );
};

export default Form;