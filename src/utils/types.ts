import { AxiosRequestConfig } from "axios";

export type TMethod = "GET" | "POST" | "PATCH" | "PUT" | "DEL";

export type TToken = string | null;

export type TAuthValue = {
  token: TToken;
  loginUser: (user: string, cb: () => void) => void;
};

export type TReqUserData = {
  email: string;
  cohort: string;
};

export type TUser = {
  _id: string;
  createdAt: number;
  updatedAt: number | null;
  email: string;
  cohort: string;
  name: string;
};

// Типизация запросов с сервера
export type TAxiosResponse = {
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
};

export type TUsersResponse = {
  total: number;
  items: TUser[];
};

export type TAxiosUsersResponse = {
  data: TUsersResponse;
} & TAxiosResponse;
