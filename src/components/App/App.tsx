import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../../pages/Login/Login";
import { Main } from "../../pages/Main/Main";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import Input from "../Input/Input";

export const App = () => {
  return (
    <>
      <Header />
      <Input
      type="text"
      text="jjj"/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};
