import React, { useState } from "react";
import "../../css/Authentication.scss";
import Signup from "./Signup";
import Login from "./Login";

export default function Authentication() {
  const [checkLoginComp, setCheckLoginComp] = useState("login");

  const getLoginCompStatus = (val) => {
    setCheckLoginComp(val);
  };

  return (
    <div className="auth-page">
      <div className="grid lg:grid-cols-2">
        {checkLoginComp === "login" ? (
          <Login checkLoginComp={getLoginCompStatus} />
        ) : (
          <Signup checkLoginComp={getLoginCompStatus} />
        )}
        <img
          className="hidden lg:block"
          src="https://i.imgur.com/tENoKL8.png"
          alt=""
        />
      </div>
    </div>
  );
}
