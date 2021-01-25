import React from "react";
import { Link } from "react-router-dom";

const LogoutButton = () => (
  <Link to="logout" className="logout-btn">
    <i className="fas fa-sign-out-alt"></i>
  </Link>
);

export default LogoutButton;