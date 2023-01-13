import React from "react";

import classes from "./text.module.scss";

interface ITextProps {
  children: React.ReactNode;
}

export const Text: React.FC<ITextProps> = ({ children }) => {
  return <p className={classes.text}>{children}</p>;
};
