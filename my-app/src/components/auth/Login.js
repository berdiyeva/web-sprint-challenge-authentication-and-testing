import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Form from "./Form";

const Login = () => {
  const [errors, setErrors] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) return history.push("/");
  }, [history]);

  const handleLogin = (credentials) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    axios
      .post(url, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location = "/";
      })
      .catch((err) => setErrors(err.response.data.message));
  };

  return <Form handleSubmit={handleLogin} errors={errors} />;
};

export default Login;