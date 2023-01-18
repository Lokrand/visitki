import { createContext, PropsWithChildren, FC } from "react";

import { useLocalStorage } from "../hook/useLocalStorage";
import { TAuthValue, TInitialUserData } from "../utils/types";

export const AuthContext = createContext({} as TAuthValue);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useLocalStorage<TInitialUserData | null>(null, "user");

  const loginUser = (user: TInitialUserData, cb: () => void): void => {
    setUser(user);
    cb();
  };

  const value: TAuthValue = { user, loginUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
