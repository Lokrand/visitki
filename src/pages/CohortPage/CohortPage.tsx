import React, { FC, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hook/useAuth";
import { COHORT_ROUTE, MAIN_ROUTE } from "../../utils/constants";
import { MainPage } from "../MainPage";

interface ICohortPage {
  cohort?: string;
}

export const CohortPage: FC<ICohortPage> = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cohort } = useParams<string>();
  useEffect(() => {
    if (user?.isLogin) navigate(user.role !== "student" ? MAIN_ROUTE : COHORT_ROUTE, { replace: true });
  }, [user]);

  return <MainPage cohort={cohort} />;
};
