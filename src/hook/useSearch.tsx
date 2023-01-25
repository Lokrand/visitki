import { useState } from "react";

import { useAuth } from "./useAuth";

import { TStateStatus } from "../utils/types";
import { handleRequest } from "../utils/utils";

export const useSearch = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<TStateStatus>({
    isloading: false,
    data: null,
    error: null,
  });

  const searchData = (url: string, params: {}) => {
    user && handleRequest(status, setStatus, url, "GET", user.token, null, params);
  };

  return { ...status, searchData };
};
