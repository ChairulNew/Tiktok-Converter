import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import "./App.css";
import NavbarSimple from "./components/Navbar/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Navbar />
      <Header />
    </>
  );
}

export default App;
