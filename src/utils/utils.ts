import axios from "axios";

import { TMethod } from "./types";

//Универсальный обработчик запроса на сервер
export const handleRequest = async <T>(url: string, method: TMethod, data = {}, headers = {}): Promise<T> => {
  const res = await (<T>axios(url, {
    method: method,
    data: data,
    headers: headers,
  }));
  return res;
};
