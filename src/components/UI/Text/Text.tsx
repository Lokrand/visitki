import React, { FC } from "react";

import styles from "./text.module.scss";

interface ITextProps {
  children: React.ReactNode;
}

export const Text: FC<ITextProps> = ({ children }) => {
  return <p className={styles.text}>{children}</p>;
};
