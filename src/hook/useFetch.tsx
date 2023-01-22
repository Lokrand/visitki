import axios from "axios";
import { useState, useEffect } from "react";

import { useAuth } from "./useAuth";

import { TFullProfile, TFullProfiles, TMethod, TToken } from "../utils/types";

type TStateStatus = {
  loading: boolean;
  //data: TFullProfile | null;
  data: any;
  error: null | unknown;
};

export const useFetch = (url: string, method: TMethod, body?: {} | null) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<TStateStatus>({
    loading: false,
    data: null,
    error: null,
  });
  const handleRequest = async (url: string, method: TMethod, token: TToken, data: {} | null = null) => {
    try {
      setStatus({ ...status, loading: true });
      const res = await axios(url, {
        method: method,
        data: data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setStatus({ ...status, loading: false, data: res.data });
    } catch (error) {
      setStatus({ ...status, loading: false, error });
    }
  };

  useEffect(() => {
    if (body && user) {
      handleRequest(url, method, user.token, body);
    } else if (user) {
      handleRequest(url, method, user.token);
    } else {
      setStatus({ ...status, loading: false, error: "Ошибка: Не удалось получить токен" });
    }
  }, []);

  return { ...status, handleRequest };
};

export const useMutation = () => {
  const { user } = useAuth();
  const handleRequest = async (url: string, method: TMethod, data: {} | null = null) => {
    try {
      const token = user?.token;
      const res = await axios(url, {
        method: method,
        data: data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRequest };
};
