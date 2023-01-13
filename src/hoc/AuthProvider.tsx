import React, { createContext, PropsWithChildren, useState } from "react";

import { TAuthValue, TUser } from "../utils/types";

export const AuthContext = createContext({} as TAuthValue);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);

  const loginUser = (user: TUser, cb: () => void): void => {
    setUser(user);
    cb();
  };

  const value: TAuthValue = { user, loginUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
