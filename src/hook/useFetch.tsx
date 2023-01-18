import axios from "axios";
import { useState, useEffect } from "react";

import { useAuth } from "./useAuth";

import { TFullProfile, TMethod, TToken } from "../utils/types";

type TStateStatus = {
  loading: boolean;
  data: TFullProfile | null;
  error: null | unknown;
};

export const useFetch = (url: string, method: TMethod, body?: {} | null) => {
  const { token } = useAuth();
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
    if (body) {
      handleRequest(url, method, token, body);
    } else {
      handleRequest(url, method, token);
    }
  }, []);

  return { ...status, handleRequest };
};
