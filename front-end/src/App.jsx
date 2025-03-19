import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import "./App.css";
import NavbarSimple from "./components/Navbar/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import MainFunc from "./components/Main/Main";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <MainFunc />
    </>
  );
}

export default App;
