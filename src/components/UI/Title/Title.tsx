import cx from "classnames";
import { FC } from "react";

import styles from "./title.module.scss";

type TSizeTitle = "h1" | "h2" | "h3" | "h4";

interface ITitleProps {
  size: TSizeTitle;
  children: React.ReactNode;
}

export const Title: FC<ITitleProps> = ({ size, children }) => {
  const switchTitle = (size: TSizeTitle): React.ReactElement => {
    switch (size) {
      case "h1":
        return <h1 className={cx(styles.title, styles.titleH1)}>{children}</h1>;
      case "h2":
        return <h2 className={cx(styles.title, styles.titleH2)}>{children}</h2>;
      case "h3":
        return <h3 className={cx(styles.title, styles.titleH3)}>{children}</h3>;
      case "h4":
        return <h4 className={cx(styles.title, styles.titleH4)}>{children}</h4>;
    }
  };
  return switchTitle(size);
};
