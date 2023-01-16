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

// Типизация поста с увлечениями пользователя
export type TPost = {
  text: string;
  image: string;
};

export type TFullPost = {
  reactions: number;
} & TPost;

export type TDescriptionUser = {
  name: string;
  photo: string;
  city: {
    name: string;
    geocode: number[];
  };
  birthda: string;
  quote: string;
  telegram: string;
  github: string;
  template: string | null;
};

// Типизация для профиля пользователя
export type TProfile = {
  _id: string;
  createdAt: number;
  updatedAt: number | null;
  email: string;
  cohort: string;
  profile: {
    name: string;
    photo: string;
    city: {
      name: string;
      geocode: number[];
    };
  };
};

// Типизация запроса на изменение профиля
export type TReqProfile = {
  profile: TDescriptionUser;
  info: {
    hobby: TPost;
    status: TPost;
    job: TPost;
    edu: TPost;
  };
};

// Типизация тела запроса на добавление комментария
export type TReqReaction = {
  target: string;
  text: string;
};

// Типизация полного профиля пользователя
export type TFullProfile = {
  _id: string;
  createdAt: number;
  updatedAt: number | null;
  email: string;
  cohort: string;
  profile: TDescriptionUser;
  info: {
    hobby: {
      info: TFullPost;
      status: TFullPost;
      job: TFullPost;
      edu: TFullPost;
    };
  };
  reactions: number;
};

// Типизация комментария(реакции) пользователя
export type TReaction = {
  _id: string;
  from: TUserFromComment;
  target: string;
  text: string;
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

// Типизация ответа от /profiles
export type TProfilesResponse = {
  total: number;
  items: TProfile[];
};

// Типизация ответа от /profiles/:id/reactions
export type TGetReactionsResponse = {
  total: number;
  items: TReaction[];
};

// Типизация ответа от /users (axios)
export type TAxiosUsersResponse = {
  data: TUsersResponse;
} & TAxiosResponse;

// Типизация ответа от /comments (axios)
export type TAxiosCommentsResponse = {
  data: TCommentsResponse;
} & TAxiosResponse;

// Типизация ответа от /profiles (axios)
export type TAxiosProfilesResponse = {
  data: TProfilesResponse;
} & TAxiosResponse;

// Типизация ответа от /profiles:id (axios)
export type TAxiosFullProfileResponse = {
  data: TFullProfile;
} & TAxiosResponse;

// Типизация ответа от /profiles:id/reactions (axios)
export type TAxiosGetReactionsResponse = {
  data: TGetReactionsResponse;
} & TAxiosResponse;
