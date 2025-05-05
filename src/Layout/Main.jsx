import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Home/Components/Navbar";
import Footer from "../pages/Home/Components/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
