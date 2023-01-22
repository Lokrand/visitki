import { FC } from "react";

import styles from "./AdminUsersPage.module.scss";

import Input from "../../components/Input/Input";

import { Button } from "../../components/UI/Button";

const StudentFrame: FC = () => {
  return (
    <div className={styles.frames}>
      <input className={`${styles.cohort} ${styles.frame}`} />
      <input className={`${styles.email} ${styles.frame}`} />
      <input className={`${styles.student} ${styles.frame}`} />
    </div>
  );
};

export const AdminUsersPage: FC = () => {
  const handlerClick = () => {
    console.log("kek");
  };

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
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <Input
            label='Фильтровать'
            inputName='AdminUserPage'
            setValue='лул'
            placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
            form='kek'
          />
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
        </div>
      </div>
    </>
  );
};
