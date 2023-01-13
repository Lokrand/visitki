export type TUser = {
  name: string;
  email: string;
};

export type TAuthValue = {
  user: TUser | null;
  loginUser: (user: TUser, cb: () => void) => void;
};
