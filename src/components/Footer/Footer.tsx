import React, { FC } from "react";

import styles from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>© Визитки</p>
      <p className={styles.footer__text_praktikum}>Яндекс Практикум</p>
    </footer>
  );
};
