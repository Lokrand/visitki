import cx from "classnames";
import { FC, ReactNode } from "react";

import styles from "./Button.module.scss";

interface IButtonProps {
  size: "l" | "m";
  disabled?: boolean;
  children: ReactNode;
  handlerClick: () => void;
}

export const Button: FC<IButtonProps> = ({ children, handlerClick, size, disabled = false }) => {
  const classes = size === "l" ? cx(styles.button, styles.button_size_l) : cx(styles.button, styles.button_size_m);
  return (
    <button className={classes} disabled={disabled} onClick={handlerClick}>
      {children}
    </button>
  );
};
