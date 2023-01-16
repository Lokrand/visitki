import { AxiosRequestConfig } from "axios";

export type TMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type TToken = string | null;

export type TAuthValue = {
  token: TToken;
  loginUser: (user: string, cb: () => void) => void;
};

export type TReqUserData = {
  email: string;
  cohort: string;
};

// Даанные о пользователе в комментарии
export type TUserFromComment = {
  _id: string;
  name: string;
  email: string;
};

// Типизация для пользователя
export type TUser = {
  _id: string;
  createdAt: number;
  updatedAt: number | null;
  email: string;
  cohort: string;
  name: string;
};

// Типизация для комментария
export type TComment = {
  _id: string;
  from: TUserFromComment;
  target: string;
  text: string;
  to: TUserFromComment;
};

// Типизация запросов с сервера
// Общая часть типизации ответа с сервера (для Axios)
export type TAxiosResponse = {
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
};

// Типизация ответа от /users
export type TUsersResponse = {
  total: number;
  items: TUser[];
};

// Типизация ответа от /comments
export type TCommentsResponse = {
  total: number;
  items: TComment[];
};

// Типизация ответа от /users (axios)
export type TAxiosUsersResponse = {
  data: TUsersResponse;
} & TAxiosResponse;

// Типизация ответа от /comments (axios)
export type TAxiosCommentsResponse = {
  data: TCommentsResponse;
} & TAxiosResponse;
