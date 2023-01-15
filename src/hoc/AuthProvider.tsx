import React, { createContext, PropsWithChildren, useState, FC } from "react";

import { TAuthValue } from "../utils/types";

export const AuthContext = createContext({} as TAuthValue);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const loginUser = (token: string, cb: () => void): void => {
    setToken(token);
    cb();
  };

  const value: TAuthValue = { token, loginUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
