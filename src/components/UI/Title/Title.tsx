import cx from "classnames";
import React from "react";

import classes from "./title.module.scss";

type TSizeTitle = "h1" | "h2" | "h3" | "h4";

interface ITitleProps {
  size: TSizeTitle;
  children: React.ReactNode;
}

export const Title: React.FC<ITitleProps> = ({ size, children }) => {
  const switchTitle = (size: TSizeTitle): React.ReactElement => {
    switch (size) {
      case "h1":
        return <h1 className={cx(classes.title, classes.titleH1)}>{children}</h1>;
      case "h2":
        return <h2 className={cx(classes.title, classes.titleH2)}>{children}</h2>;
      case "h3":
        return <h3 className={cx(classes.title, classes.titleH3)}>{children}</h3>;
      case "h4":
        return <h4 className={cx(classes.title, classes.titleH4)}>{children}</h4>;
    }
  };
  return switchTitle(size);
};
