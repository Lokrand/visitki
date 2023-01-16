import axios from "axios";

import { TMethod, TToken } from "./types";

//Универсальный обработчик запроса на сервер
export const handleRequest = async <T>(
  url: string,
  method: TMethod,
  token: TToken = null,
  data: {} | null = null,
): Promise<T> => {
  const res = await (<T>axios(url, {
    method: method,
    data: data,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }));
  return res;
};
