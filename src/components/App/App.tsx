import React from "react";

import { AuthProvider } from "../../hoc/AuthProvider";

import { AppRouter } from "../AppRouter";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
