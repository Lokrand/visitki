import { FC, useState } from "react";

import styles from "./AdminUsersPage.module.scss";

import { StudentFrame } from "../../components/FrameStudent/FrameStudent";
import Input from "../../components/Input/Input";
import { Button } from "../../components/UI/Button";
import { useFetch } from "../../hook/useFetch";

import { getAllUsers } from "../../utils/api";

export const AdminUsersPage: FC = () => {
  const { url, method } = getAllUsers();
  const { data, error, loading } = useFetch(url, method);

  if (error) return <h1>Студенты не найдены</h1>;
  let studentsData: any[] = [];
  let students: any[] = [];

  if (data) {
    studentsData = data.items;
    studentsData = studentsData.filter((el) => students.push(el));
  }
  // const [form, setValue] = useState({
  //   data: "",
  // });
  const handlerClick = () => {
    console.log("kek");
  };

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
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <Input
            label='Фильтровать'
            inputName='AdminUserPage'
            setValue='{setValue}'
            placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
            form='{form}'
          />
          <div className={styles.main}>
            <p className={styles.column}>Номер когорты</p>
            <p className={styles.column}>E-mail</p>
            <p className={styles.column}>Имя и фамилия студента</p>
          </div>
          {students.map((student) => (
            <StudentFrame student={student} />
          ))}
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
    </section>
  );
};
