import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./applayout.module.scss";

import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const AppLayout: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.conteiner}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
