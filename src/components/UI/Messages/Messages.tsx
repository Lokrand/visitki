import React, { FC } from "react";

import styles from "./Messages.module.scss";

import { useFetch } from "../../../hook/useFetch";
import { getUserReactions } from "../../../utils/api";

interface IMessages {
  id: string;
}

export const Messages: FC<IMessages> = ({ id }) => {
  const { url } = getUserReactions(id);
  const { data, error, isloading } = useFetch(url);
  if (isloading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Сообщения не найдены</h1>;
  let counter = 0;
  if (data) {
    const messages = data.items.filter((el: any) => el.text);
    if (messages) counter = messages.length;
  }
  return (
    <div className={styles.messages}>
      <p>{counter}</p>
      <p>cообщений</p>
    </div>
  );
};
