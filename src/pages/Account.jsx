import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./Account.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Navbar />
      <div className="account-page-container">
        <div className="account-page-card">
          <h2 className="account-page-title">{isLogin ? "Login" : "Register"}</h2>
          {isLogin ? <Login /> : <Register />}
          <p 
            onClick={() => setIsLogin(!isLogin)} 
            className="account-page-switch-text"
          >
            {isLogin 
              ? "Don’t have an account? Register" 
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
