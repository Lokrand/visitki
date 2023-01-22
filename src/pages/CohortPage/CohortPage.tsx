import React, { FC, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import styles from "./cohortPage.module.scss";

import { useAuth } from "../../hook/useAuth";
import { COHORT_ROUTE, MAIN_ROUTE } from "../../utils/constants";
import { MainPage } from "../MainPage";

interface ICohortPage {
  cohort?: string;
}

export const CohortPage: FC<ICohortPage> = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const cohort = location.pathname.split("/")[0];
  console.log(cohort);
  useEffect(() => {
    if (user?.isLogin) navigate(user.role !== "student" ? MAIN_ROUTE : COHORT_ROUTE, { replace: true });
  }, [user]);

  return <MainPage cohort={cohort} />;
};
