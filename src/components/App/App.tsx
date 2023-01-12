import React from "react";
import { Routes, Route } from "react-router-dom";
import { Gallery } from "../../pages/Gallery/Gallery";
import { Login } from "../../pages/Login/Login";
import { Main } from "../../pages/Main/Main";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";


export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
      <Footer />
      </>
  );
};
