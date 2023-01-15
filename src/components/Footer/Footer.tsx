import React, { FC } from "react";

import styles from "./Footer.module.scss";

import { Text } from "../UI/Text";

export const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <Text>The quick brown fox jumps over the lazy dog.</Text>
    </div>
  );
};
