import React from "react";
// import "./Header.css";
import logo from "../assets/lv-logo-white.png"
import settings from "../assets/icon-setting.png"
import userprogile from "../assets/avatar.png"
import upload from "../assets/icon-upload.png"
import "../style/header.scss"

const Header = ()  => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="LatentView Logo" className="logo" />
      </div>

      <h1 className="header-title">Sales Cockpit Generator</h1>

      <div className="header-right">
        <img src={settings} alt="Settings" className="icon" />
        <img src={upload} alt="Upload" className="icon" />
        <img src={userprogile} alt="User" className="profile-pic" />
      </div>
    </header>
  );
}

export default Header;