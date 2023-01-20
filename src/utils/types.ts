export type TMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
export type TToken = string | null;
export type TTemplate = "default" | "romantic" | "daring";
export type TRoleUser = "student" | "curator";

export type TInitialUserData = {
  isLogin: boolean;
  id: string;
  role: TRoleUser;
  token: TToken;
};

export type TAuthValue = {
  user: TInitialUserData | null;
  loginUser: (user: TInitialUserData, cb: () => void) => void;
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
  template: TTemplate;
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
    hobby: TFullPost;
    status: TFullPost;
    job: TFullPost;
    edu: TFullPost;
  };
  reactions: number;
};

export type TFullProfiles = {
  total: number;
  items: ReadonlyArray<TFullProfile> | null;
};

// Типизация тела запросов на сервер
export type TReturnData = {
  url: string;
  method: TMethod;
};

export type TReturnDataNewUser = {
  body: TReqUserData;
} & TReturnData;

export type TReturnDataChangeUser = {
  body: TReqUserData;
} & TReturnData;

export type TReturnDataChangeUserProfile = {
  body: TReqProfile;
} & TReturnData;

export type TReturnDataAddUserReactions = {
  body: TReqReaction;
} & TReturnData;

//Типы формы (пока не применяла)
export type TForm = {
  photo: string;
  birthday: string;
  city: {
    name: string;
    geocode: number[];
  };
  telegram: string;
  github: string;
  template: string | null;
  quote: string;
  hobbyImage: string;
  hobby: string;
  statusImage: string;
  status: string;
  job: string;
  edu: string;
};
