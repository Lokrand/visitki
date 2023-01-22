import { Dispatch, FC, FormEventHandler, MouseEventHandler, SetStateAction, useState, ChangeEvent } from "react";

import styles from "./AdminUsersPage.module.scss";

import { Button } from "../../components/UI/Button";
import { useMutation } from "../../hook/useMutation";
import { Cross } from "../../icons/Cross/Cross";
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

// export const AdminUsersPage: FC = () => {
//   const handlerClick = () => {};

//   const { handleRequest } = useMutation();

//   const handleFileLoad = (ev: React.ChangeEvent<HTMLInputElement>) => {
//     ev.preventDefault();
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const text = e.target?.result;
//       console.log(text);
//       if (typeof text === "string") {
//         const newUsers = parseUsersCsv(text);
//         const result = await Promise.all(
//           newUsers.map((el) => {
//             return handleRequest(USERS_URL, "POST", el);
//           }),
//         );
//       } else {
//         console.error("Неправильный тип файла");
//       }
//     };
//     if (ev.target.files) {
//       reader.readAsText(ev.target.files[0]);
//     }
export const AdminUsersPage: FC = () => {
  // const handlerClick = () => {};

  const { mutationData } = useMutation();

  const handleFileLoad = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      console.log(text);
      if (typeof text === "string") {
        const newUsers = parseUsersCsv(text);
        const result = await Promise.all(
          newUsers.map((el) => {
            return mutationData(USERS_URL, "POST", el);
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
          {/* <Button size='l' children='Выберите файл' handlerClick={handlerClick} /> */}
          <input type='file' accept={".csv"} onChange={handleFileLoad} />
        </div>
      </div>
    </>
  );
};
