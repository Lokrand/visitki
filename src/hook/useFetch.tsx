import { useState, useEffect } from "react";

import { useAuth } from "./useAuth";

import { TStateStatus } from "../utils/types";
import { handleRequest } from "../utils/utils";

export const useFetch = <T extends any = any>(url: string) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<TStateStatus<T>>({
    isloading: false,
    data: undefined,
    error: null,
  });

  useEffect(() => {
    if (url && user) {
      handleRequest(status, setStatus, url, "GET", user.token);
    } else {
      setStatus({ ...status, isloading: false, error: "Ошибка: Не удалось получить токен" });
    }
  }, [url, user]);

  return { ...status };
};
