import React, { FC } from "react";

import styles from "./AdminCommentPage.module.scss";

import Input from "../../components/Input/Input";

import { Cross } from "../../icons/Cross/Cross";

const CommentFrame = () => {
  return (
    <>
      <div className={styles.frames}>
        <p className={`${styles.frame}`}>1853</p>
        <p className={`${styles.frame}`}>20.12.2022</p>
        <p className={`${styles.frame}`}>Дмитрий Степанов</p>
        <p className={`${styles.frame}`}>Виктория Листвина</p>
        <p className={`${styles.frame}`}>из блока Увлечения</p>
        <p className={`${styles.frame}`}>
          Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще слушать музыку, ходить
          в кино, общаться с друзьями. Ну и учиться в Практикуме.{" "}
        </p>
        <Cross />
      </div>
    </>
  );
};

export const AdminCommentPage: FC = () => {
  return (
    <>
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
        setValue='kek'
        form='oue'
      />
      <div className={styles.main}>
        <p className={styles.column}>Когорта</p>
        <p className={styles.column}>Дата</p>
        <p className={styles.column}>Отправитель</p>
        <p className={styles.column}>Получатель</p>
        <p className={styles.column}>Откуда комментарий</p>
        <p className={styles.column}>Текст комментария</p>
      </div>
      <CommentFrame />
      <CommentFrame />
      <CommentFrame />
      <CommentFrame />
    </>
  );
};
