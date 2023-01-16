import { type } from "os";

export type TAuthValue = {
  token: string | null;
  loginUser: (user: string, cb: () => void) => void;
};

export interface IForm {
  photo: string;
  birthday: string;
  city: string;
  telegram: string;
  github: string;
  template: string;
  quote: string;
  hobbyImage: string;
  hobby: string;
  statusImage: string;
  status: string;
  job: string;
  edu: string;
}
