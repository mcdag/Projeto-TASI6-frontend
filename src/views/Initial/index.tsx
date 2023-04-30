import React from "react";
import Logo from "../../assets/logo.svg";
import "./styles.scss";
import Header from "../../components/Header";
import Balaclava from "../../assets/balaclava1.svg";

function Initial() {
  return (
    <>
      <Header />
      <div className="container">
        <img src={Balaclava} style={{width: "50px"}}></img>
      </div>
    </>
  );
}

export default Initial;
