// Список эндпоинтов
export const USERS_URL = "/users";
export const COMMENTS_URL = "/comments";
export const PROFILES_URL = "/profiles";

// Список маршрутов
export const MAIN_ROUTE = "/";
export const LOGIN_ROUTE = `${MAIN_ROUTE}login`;
//куратор может заходить на страницу любой когорты по адресу /cohort/{name} (COHORT_ROUTE) по ссылкам из админки.
export const COHORT_ROUTE = `${MAIN_ROUTE}cohort/:name`;
// страница с детальной информацией о пользователе (которая с темами)
export const DETAIL_ROUTE = `${MAIN_ROUTE}detail/:idUser`;
export const PROFILE_ROUTE = `${MAIN_ROUTE}profile/:id`;
export const MAP_ROUTE = `${MAIN_ROUTE}map`;
export const ADMIN_ROUTE = `${MAIN_ROUTE}admin`;
export const ADMIN_USERS_ROUTE = `${ADMIN_ROUTE}/users`;
export const FILE_NOT_FOUND_ROUTE = "*";
