import { useState } from "react";

import { useAuth } from "./useAuth";

import { TMethod, TStateStatus } from "../utils/types";
import { handleRequest } from "../utils/utils";

export const useMutation = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<TStateStatus>({
    isloading: false,
    data: null,
    error: null,
  });

  const mutationData = (url: string, method: TMethod, data: any) => {
    user && handleRequest(status, setStatus, url, method, user.token, data);
  };

  return { ...status, mutationData };
};
