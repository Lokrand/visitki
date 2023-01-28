import { YMaps } from "@pbe/react-yandex-maps";
import React, { FC } from "react";

import { AuthProvider } from "../../hoc/AuthProvider";

import { AppRouter } from "../AppRouter";

export const App: FC = () => {
  return (
    <AuthProvider>
      <YMaps>
        <AppRouter />
      </YMaps>
    </AuthProvider>
  );
};
