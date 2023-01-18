import { COMMENTS_URL, PROFILES_URL, USERS_URL } from "./constants";
import {
  TReqProfile,
  TReqReaction,
  TReqUserData,
  TReturnData,
  TReturnDataAddUserReactions,
  TReturnDataChangeUser,
  TReturnDataChangeUserProfile,
  TReturnDataNewUser,
} from "./types";

//Получение данных об пользователях с сервера
export const getAllUsers = (): TReturnData => {
  return { url: USERS_URL, method: "GET" };
};

//Создать нового пользователя на сервере
export const addNewUser = (body: TReqUserData): TReturnDataNewUser => {
  return { url: USERS_URL, method: "POST", body };
};

//Обновить информацию о пользователе
export const changeUserData = (idUser: string, body: TReqUserData): TReturnDataChangeUser => {
  return { url: `${USERS_URL}/${idUser}`, method: "PUT", body };
};

//Получение всех коментариев пользователей
export const getAllComments = (): TReturnData => {
  return { url: COMMENTS_URL, method: "GET" };
};

//Удаление комментария по его id (надо проверить)
export const deleteComment = (idComment: string): TReturnData => {
  return { url: `${COMMENTS_URL}/${idComment}`, method: "DELETE" };
};

//Получение всех профилей пользователей
export const getAllProfiles = (): TReturnData => {
  return { url: PROFILES_URL, method: "GET" };
};

//Получение полного профиля пользователя по id
export const getFullProfile = (idUser: string | null): TReturnData => {
  return { url: `${PROFILES_URL}/${idUser}`, method: "GET" };
};

//Получение полного профиля пользователя по id
export const changeUserProfile = (idUser: string, body: TReqProfile): TReturnDataChangeUserProfile => {
  return { url: `${PROFILES_URL}/${idUser}`, method: "PATCH", body };
};

//Получение реакций пользователя по id
export const getUserReactions = (idUser: string): TReturnData => {
  return { url: `${PROFILES_URL}/${idUser}/reactions`, method: "GET" };
};

//Добавить реакцию на выбранный пост по id пользователя
export const addUserReactions = (idUser: string, body: TReqReaction): TReturnDataAddUserReactions => {
  return { url: `${PROFILES_URL}/${idUser}/reactions`, method: "POST", body };
};
