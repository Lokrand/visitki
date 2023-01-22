import { Dispatch, FC, FormEventHandler, MouseEventHandler, SetStateAction, useState } from "react";

import styles from "./AdminUsersPage.module.scss";

import { Button } from "../../components/UI/Button";

import { Cross } from "../../icons/Cross/Cross";

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
  const [form, setValue] = useState({ filter: "" });
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [displayStyle, setDisplayStyle] = useState({ display: "none" });
  const handleInputChange: FormEventHandler<HTMLInputElement> | undefined = (e) => {
    const target = e.target as HTMLInputElement;
    setValue({ filter: target.value });
    target.value.length ? setDisplayStyle({ display: "block" }) : setDisplayStyle({ display: "none" });
  };

  const handleInputFocus = () => {
    setFocus(true);
  };
  const handleInputBlur = () => {
    setFocus(false);
  };
  const handleButtonClick = () => {
    setValue({ filter: "" });
    setDisplayStyle({ display: "none" });
  };
  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseleave" && !focus) {
      setHover(false);
    } else setHover(true);
  };
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
          <div className={styles.container_input}>
            <label className={styles.label}>Фильтровать</label>
            <input
              type='text'
              name='filter'
              value={form.filter}
              className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
                 ${hover ? styles.input_status_active : styles.input_status_default}`}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onMouseEnter={handleInputHover}
              onMouseLeave={handleInputHover}
              onChange={handleInputChange}
              placeholder='По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)'
            />
            <span className={styles.button} style={displayStyle} onClick={handleButtonClick}>
              <Cross />
            </span>
          </div>
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
