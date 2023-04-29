import React from "react";
import Logo from "../../assets/logo.svg";
import "./styles.scss";
import Header from "../../components/Header";

function Initial() {
  return (
    <>
      <Header />
      <div className="container">
        <button
          className="logo"
          onClick={() => window.location.replace(`${window.location.origin}/`)}
        >
          <img src={Logo} alt="logo" />
        </button>
      </div>
    </>
  );
}

export default Initial;
