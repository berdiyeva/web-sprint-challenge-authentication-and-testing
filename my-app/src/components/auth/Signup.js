  
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Form from "./Form";

const Signup = () => {
  const [errors, setErrors] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) return history.push("/");
  }, [history]);

  const handleSignup = (credentials) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/register`;
    axios
      .post(url, credentials)
      .then((res) => {
        if (res.data.username) {
          history.push("/login");
        }
      })
      .catch((err) => setErrors(err.response.data.message));
  };

  return <Form handleSubmit={handleSignup} errors={errors} />;
};

export default Signup;