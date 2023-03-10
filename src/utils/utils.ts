import axios from "axios";

import { TMethod, TToken, TStateStatus } from "../utils/types";

export const handleRequest = async (
  status: TStateStatus,
  setStatus: React.Dispatch<React.SetStateAction<TStateStatus>>,
  url: string,
  method: TMethod,
  token: TToken,
  data: {} | null = null,
  params: {} | null = null,
) => {
  try {
    setStatus({ ...status, isloading: true });
    const res = await axios(url, {
      method: method,
      data: data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: params,
    });
    if (res.statusText !== "OK") {
      throw new Error();
    }
    setStatus({ ...status, isloading: false, data: res.data });
  } catch (error) {
    setStatus({ ...status, isloading: false, error });
  }
};
