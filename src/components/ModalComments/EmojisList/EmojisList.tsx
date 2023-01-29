/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";

import { emojies, getInitialEmojiesState, getReactionsCountByType, TEmojiesId } from ".";

import { Emoji } from "./Emoji/Emoji";
import styles from "./EmojisList.module.scss";

import { useFetch } from "../../../hook/useFetch";
import { getFullProfile } from "../../../utils/api";
import { TFullProfile } from "../../../utils/types";

interface IEmojisList {
  id: string;
  modalFor: string;
}

export const EmojisList: FC<IEmojisList> = ({ id, modalFor }) => {
  const { url } = getFullProfile(id);
  const { data } = useFetch<TFullProfile>(url);
  const reactionsCount = getReactionsCountByType(modalFor, data);
  const [state, setState] = useState<Record<TEmojiesId, number>>(getInitialEmojiesState(reactionsCount));

  useEffect(() => {
    setState(getInitialEmojiesState(reactionsCount));
  }, [reactionsCount]);

  const updateState = (nextState: Partial<Record<TEmojiesId, number>>) => {
    setState((prevState) => ({ ...prevState, ...nextState }));
  };

  const handleEmojiClick = (id: TEmojiesId, active: boolean) => {
    const count = !active ? state[id] - 1 : state[id] + 1;
    updateState({ [id]: count });
  };

  return (
    <div className={styles.emojis}>
      {emojies.map((emoji) => (
        <Emoji
          key={emoji.id}
          id={emoji.id}
          img={emoji.img}
          alt={emoji.alt}
          counter={state[emoji.id]}
          onClick={handleEmojiClick}
        />
      ))}
    </div>
  );
};
