import cx from "classnames";
import React, { FC, ReactNode, ReactElement } from "react";

import styles from "./title.module.scss";

type TSizeTitle = "xl" | "l" | "m" | "s";

interface ITitleProps {
  size: TSizeTitle;
  children: ReactNode;
}

export const Title: FC<ITitleProps> = ({ size, children }) => {
  const switchTitle = (size: TSizeTitle): ReactElement => {
    switch (size) {
      case "xl":
        return <h1 className={cx(styles.title, styles.title_size_xl)}>{children}</h1>;
      case "l":
        return <h2 className={cx(styles.title, styles.title_size_l)}>{children}</h2>;
      case "m":
        return <h3 className={cx(styles.title, styles.title_size_m)}>{children}</h3>;
      case "s":
        return <h4 className={cx(styles.title, styles.title_size_s)}>{children}</h4>;
    }
  };
  return switchTitle(size);
};
