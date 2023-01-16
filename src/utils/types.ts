export type TAuthValue = {
  token: string | null;
  loginUser: (user: string, cb: () => void) => void;
};

export type TMethod = "GET" | "POST" | "PATCH" | "PUT" | "DEL";
