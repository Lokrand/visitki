import React, { FC } from "react";

import styles from "./AdminUsersPage.module.scss";

import Input from "../../components/Input/Input";

import { Button } from "../../components/UI/Button";
import { useMutation } from "../../hook/useFetch";
import { USERS_URL } from "../../utils/constants";
import { TReqUserData } from "../../utils/types";

const StudentFrame: FC = () => {
  return (
    <div className={styles.frames}>
      <input className={`${styles.cohort} ${styles.frame}`} />
      <input className={`${styles.email} ${styles.frame}`} />
      <input className={`${styles.student} ${styles.frame}`} />
    </div>
  );
};

const parseUsersCsv = (str: string): TReqUserData[] => {
  const result: TReqUserData[] = [];
  const rows = str.split("\n").map((el) => el.replace(/\r$/, ""));
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(";");
    result.push({
      email: row[0],
      cohort: row[1],
    });
  }
  return result;
};

export const AdminUsersPage: FC = () => {
  const handlerClick = () => {};

  const { handleRequest } = useMutation();

  const handleFileLoad = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      console.log(text);
      if (typeof text === "string") {
        const newUsers = parseUsersCsv(text);
        const result = await Promise.all(
          newUsers.map((el) => {
            return handleRequest(USERS_URL, "POST", el);
          }),
        );
      } else {
        console.error("Неправильный тип файла");
      }
    };
    if (ev.target.files) {
      reader.readAsText(ev.target.files[0]);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.table}>
          {/* <Input
            label='Фильтровать'
            inputName='AdminUserPage'
            setValue='лул'
            placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
            form='kek'
          /> */}
          <div className={styles.main}>
            <p className={styles.column}>Номер когорты</p>
            <p className={styles.column}>E-mail</p>
            <p className={styles.column}>Имя и фамилия студента</p>
          </div>
          <StudentFrame />
          <StudentFrame />
          <StudentFrame />
          <StudentFrame />
          <StudentFrame />
          <StudentFrame />
          <StudentFrame />
          <StudentFrame />
          <StudentFrame />
        </div>
        <div className={styles.adder}>
          <h3 className={styles.title}>Добавить студентов</h3>
          <p className={styles.text}>
            Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email
            студентов, вторая колонка — номер когорты.
          </p>
          <Button size='l' children='Выберите файл' handlerClick={handlerClick} />
          <input type='file' accept={".csv"} onChange={handleFileLoad} />
        </div>
      </div>
    </>
  );
};
