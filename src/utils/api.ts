import { COMMENTS_URL, PROFILES_URL, USERS_URL } from "./constants";
import {
  TAxiosCommentsResponse,
  TAxiosFullProfileResponse,
  TAxiosGetReactionsResponse,
  TAxiosProfilesResponse,
  TAxiosUsersResponse,
  TReqProfile,
  TReqReaction,
  TReqUserData,
  TToken,
} from "./types";
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

//Получение всех профилей пользователей
export const getAllProfiles = (token: TToken) => {
  return handleRequest<TAxiosProfilesResponse>(PROFILES_URL, "GET", token);
};

//Получение полного профиля пользователя по id
export const getFullProfile = (idUser: string, token: TToken) => {
  return handleRequest<TAxiosFullProfileResponse>(`${PROFILES_URL}/${idUser}`, "GET", token);
};

//Получение полного профиля пользователя по id
export const changeUserProfile = (idUser: string, token: TToken, body: TReqProfile) => {
  return handleRequest<TAxiosFullProfileResponse>(`${PROFILES_URL}/${idUser}`, "PATCH", token, body);
};

//Получение реакций пользователя по id
export const getUserReactions = (idUser: string, token: TToken) => {
  return handleRequest<TAxiosGetReactionsResponse>(`${PROFILES_URL}/${idUser}/reactions`, "GET", token);
};

//Добавить реакцию на выбранный пост по id пользователя
export const addUserReactions = (idUser: string, token: TToken, body: TReqReaction) => {
  return handleRequest(`${PROFILES_URL}/${idUser}/reactions`, "POST", token, body);
};
