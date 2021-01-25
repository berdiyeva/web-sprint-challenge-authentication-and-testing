import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils";

const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    axiosWithAuth()
      .get(`${process.env.REACT_APP_API_URL}/auth/logout`)
      .then(() => {
        localStorage.removeItem("token");
        window.location = "/login";
      })
      .catch((err) => console.log(err.response || err));
  }, [history]);

  return <></>;
};

export default Logout;