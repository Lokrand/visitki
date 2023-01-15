export type TAuthValue = {
  token: string | null;
  loginUser: (user: string, cb: () => void) => void;
};
