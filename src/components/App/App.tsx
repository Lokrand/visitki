import React from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "../../pages/LoginPage";
import { MainPage } from "../../pages/MainPage";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
};
