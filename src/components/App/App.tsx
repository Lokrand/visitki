import React from "react";

import { AppRouter } from "../AppRouter";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const App = () => {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
};
