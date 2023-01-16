import { USERS_URL } from "./constants";
import { TAxiosUsersResponse, TReqUserData, TToken } from "./types";
import { handleRequest } from "./utils";

//Получение данных об пользователях с сервера
export const getAllUsers = (token: TToken) => {
  return handleRequest<TAxiosUsersResponse>(USERS_URL, "GET", token);
};

//Создать нового пользователя на сервере
export const addNewUser = (token: TToken, body: TReqUserData) => {
  return handleRequest<TAxiosUsersResponse>(USERS_URL, "POST", token, body);
};

//Обновить информацию о пользователе
export const changeUserData = (idUser: string, token: TToken, body: TReqUserData) => {
  return handleRequest<TAxiosUsersResponse>(`${USERS_URL}/${idUser}`, "PUT", token, body);
};
