import React, { FC, useState } from "react";

import { Scrollbars } from "react-custom-scrollbars";

import styles from "./AdminCommentPage.module.scss";

import { CommentFrame } from "../../components/FrameComment/FrameComment";
import Input from "../../components/Input/Input";
import { useFetch } from "../../hook/useFetch";

import { CrossRed } from "../../icons/CrossRed/CrossRed";
import { getAllComments } from "../../utils/api";
import { getAllUsers } from "../../utils/api";

export const AdminCommentPage: FC = () => {
  const { url, method } = getAllComments();
  const { data, error, loading } = useFetch(url, method);

  if (error) return <h1>Студенты не найдены</h1>;
  let commentsData: any[] = [];
  let comments: any = [];

  if (data) {
    commentsData = data.items;
    commentsData = commentsData.filter((el) => comments.push(el));
  }

  console.log(comments);

  // const [form, setValue] = useState({
  //   data: "",
  // });
  return (
    <section>
      <div className={styles.container}>
        <a href='/admin/users' className={styles.title}>
          Студенты
        </a>
        <a href='/admin' className={styles.title}>
          Комментарии
        </a>
      </div>
      <Input
        label='Фильтровать'
        inputName='AdminCommentPage'
        placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
        setValue='{setValue}'
        form='{form}'
      />
      <div className={styles.main}>
        <p className={styles.column}>Когорта</p>
        <p className={styles.column}>Дата</p>
        <p className={styles.column}>Отправитель</p>
        <p className={styles.column}>Получатель</p>
        <p className={styles.column}>Откуда комментарий</p>
        <p className={styles.column}>Текст комментария</p>
      </div>
      {comments.map((comment: any) => (
        <CommentFrame comment={comment} />
      ))}
    </section>
  );
};
