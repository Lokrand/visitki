import React, { FC } from "react";

import { Routes, Route } from "react-router-dom";

// Импорт hoc
import { ProtectedRoute } from "../../hoc/ProtectedRoute";

// Импорты страниц
import { AdminCommentPage } from "../../pages/AdminCommentPage";
import { AdminUsersPage } from "../../pages/AdminUsersPage";
import { CohortPage } from "../../pages/CohortPage";
import { DetailPage } from "../../pages/DetailPage";
import { FileNotFoundPage } from "../../pages/FileNotFoundPage";
import { LoginPage } from "../../pages/LoginPage";
import { MainPage } from "../../pages/MainPage";
import { MapPage } from "../../pages/MapPage";
import { ProfilePage } from "../../pages/ProfilePage";

// Импорт переменных с маршрутами
import {
  MAIN_ROUTE,
  COHORT_ROUTE,
  DETAIL_ROUTE,
  PROFILE_ROUTE,
  MAP_ROUTE,
  ADMIN_ROUTE,
  ADMIN_USERS_ROUTE,
  LOGIN_ROUTE,
  FILE_NOT_FOUND_ROUTE,
} from "../../utils/constants";

// Импорт шаблона страницы
import { AppLayout } from "../AppLayout";

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={MAIN_ROUTE} element={<AppLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<MainPage />} />
          <Route path={COHORT_ROUTE} element={<CohortPage />} />
          <Route path={DETAIL_ROUTE} element={<DetailPage />} />
          <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
          <Route path={MAP_ROUTE} element={<MapPage />} />
          <Route path={ADMIN_ROUTE} element={<AdminCommentPage />} />
          <Route path={ADMIN_USERS_ROUTE} element={<AdminUsersPage />} />
        </Route>
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={FILE_NOT_FOUND_ROUTE} element={<FileNotFoundPage />} />
      </Route>
    </Routes>
  );
};
