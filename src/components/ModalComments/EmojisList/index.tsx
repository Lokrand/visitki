import blackHeart from "../../../images/blackHeart.svg";
import dislike from "../../../images/dislike.svg";
import hello from "../../../images/hello.svg";
import irritation from "../../../images/irritation.svg";
import laugh from "../../../images/laugh.svg";
import like from "../../../images/like.svg";
import love from "../../../images/love.svg";
import sad from "../../../images/sad.svg";
import shock from "../../../images/shock.svg";
import smile from "../../../images/smile.svg";
import { TFullProfile } from "../../../utils/types";

export const emojies = [
  { img: like, alt: "Лайк", id: "Like" },
  { img: dislike, alt: "Дизлайк", id: "DisLike" },
  { img: hello, alt: "Привет", id: "Hello" },
  { img: smile, alt: "Улыбка", id: "Smile" },
  { img: sad, alt: "Грусть", id: "Sad" },
  { img: laugh, alt: "Смех", id: "Laugh" },
  { img: irritation, alt: "Раздражение", id: "Irritation" },
  { img: shock, alt: "Удивление", id: "Shock" },
  { img: love, alt: "Любовь", id: "Love" },
  { img: blackHeart, alt: "Чёрное сердце", id: "BlackHeart" },
] as const;

export type TEmojiesId = (typeof emojies)[number]["id"];

export const getReactionsCountByType = (type: string, data: TFullProfile | undefined) => {
  if (data) {
    if (type === "main") return data.reactions;
    if (type === "hobby") return data.info.hobby.reactions;
    if (type === "edu") return data.info.edu.reactions;
    if (type === "status") return data.info.status.reactions;
    if (type === "job") return data.info.job.reactions;
    if (type === "DetailsImage") return data.reactions;
  }
  return 0;
};

export const getInitialEmojiesState = (totalCount: number): Record<TEmojiesId, number> => {
  const ids = emojies.map((el) => el.id);
  const result = Object.fromEntries(ids.map((el) => [el, 0])) as Record<TEmojiesId, number>;
  for (let i = 0; i < ids.length; i++) {
    if (i === ids.length - 1) {
      result[ids[i]] = totalCount;
      break;
    }
    const count = Math.floor(Math.random() * (totalCount + 1));
    result[ids[i]] = count;
    totalCount = totalCount - count;
  }
  return result;
};
