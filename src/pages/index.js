import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './style.scss';
import Header from "../components/header";
import PPTGenerator from "./Home";
// import Navbar from "./navbar";
// import Home from "./home";

const Pages = () => {

  return (
    <div className="App">
      <div className="dashboard-wrapper">
        <Header />
        <div className="dashboard-content">
          <Routes>
            <Route exact path='/home' element={<PPTGenerator />} />
          </Routes>
        </div>
      </div>
    </div >
  )
}

export default Pages;