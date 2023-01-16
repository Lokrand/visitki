import { COMMENTS_URL, USERS_URL } from "./constants";
import { TAxiosCommentsResponse, TAxiosUsersResponse, TReqUserData, TToken } from "./types";
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

//Получение всех коментариев пользователей
export const getAllComments = (token: TToken) => {
  return handleRequest<TAxiosCommentsResponse>(COMMENTS_URL, "GET", token);
};

//Удаление комментария по его id (надо проверить)
export const deleteComment = (idComment: string, token: TToken) => {
  return handleRequest(`${COMMENTS_URL}/${idComment}`, "DELETE", token);
};
