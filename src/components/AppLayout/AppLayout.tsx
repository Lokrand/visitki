import React from "react";
import { Outlet } from "react-router-dom";

import classes from "./applayout.module.scss";

import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={classes.conteiner}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
