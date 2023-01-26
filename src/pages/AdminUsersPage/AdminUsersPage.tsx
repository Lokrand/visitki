import { FC, FormEventHandler, MouseEventHandler, useState, ChangeEvent, useMemo } from "react";

import { Link } from "react-router-dom";

import styles from "./AdminUsersPageStyles.module.scss";

import { StudentFrame } from "../../components/FrameStudent/FrameStudent";
import { Text } from "../../components/UI/Text";

import useDebounce from "../../hook/useDebounce";
import { useFetch } from "../../hook/useFetch";
import { useMutation } from "../../hook/useMutation";
import { useSearch } from "../../hook/useSearch";
import { Cross } from "../../icons/Cross/Cross";
import { Delete } from "../../icons/Delete/Delete";
import { getAllUsers } from "../../utils/api";

import { USERS_URL } from "../../utils/constants";
import { TReqUserData, TUser } from "../../utils/types";

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
  const { mutationData } = useMutation();
  const [isHiddenAlert, setIsHiddenAlert] = useState(false);
  const { searchData } = useSearch();
  const debouncedSearch = useDebounce(searchData, 500);
  const [studentsNew, setStudentsNew] = useState<TReqUserData[]>([]);
  const handleFileLoad = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        const newUsers = parseUsersCsv(text);
        setStudentsNew(newUsers);
        //это наверное теперь должно происходить по клику сохранить, но не уверена, что уходит как надо
        //help
        const result = await Promise.all(
          newUsers.map((el) => {
            //return mutationData(USERS_URL, "POST", el);
          }),
        );
        setIsHiddenAlert(true);
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
    debouncedSearch(url, { limit: 10, search: target.value });
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

  const { url } = getAllUsers();
  const { data, error, isloading } = useFetch(url);
  const [students, setStudents] = useState<TUser[]>([]);
  const [itemToHide, setItemToHide] = useState("");
  const [order, setOrder] = useState(false);
  const [color, setColor] = useState("#3B23B7");
  const [border, setBorder] = useState("1px solid #3B23B7");
  useMemo(() => {
    if (data) {
      setStudents(data.items);
    }
    if (itemToHide) {
      setStudents(
        students.map((student) => {
          if (student._id === itemToHide) {
            return { ...student, cohort: "deleted" };
          } else return student;
        }),
      );
    }
  }, [data, itemToHide]);
  const sortByCohort = (arr: TUser[]) => {
    return arr.sort((a, b) => {
      return a.cohort.toLowerCase().localeCompare(b.cohort.toLowerCase());
    });
  };
  const sortByMail = (arr: TUser[]) => {
    return arr.sort((a, b) => {
      return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
    });
  };
  if (isloading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Не удалось никого найти. Исправьте запрос или сбросьте фильтр</h1>;

  return (
    <section>
      <div className={styles.container}>
        <Link to='/admin/users' className={styles.title}>
          Студенты
        </Link>
        <Link to='/admin' className={styles.title}>
          Комментарии
        </Link>
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
            <p
              className={styles.column}
              onClick={() => {
                setOrder(!order);
                sortByCohort(students);
              }}
            >
              Номер когорты
            </p>
            <p
              className={styles.column}
              onClick={() => {
                setOrder(!order);
                sortByMail(students);
              }}
            >
              E-mail
            </p>
            <p className={styles.column}>Имя и фамилия студента</p>
          </div>
          {studentsNew.map((student: any, i: number) => {
            return (
              <StudentFrame key={i} student={student} setItemToHide={setItemToHide} color={color} border={border} />
            );
          })}
          {students.map((student) => {
            if (student.cohort !== "deleted") {
              return (
                <StudentFrame
                  key={student._id}
                  student={student}
                  setItemToHide={setItemToHide}
                  icon={isHiddenAlert ? <Delete /> : false}
                />
              );
            }
          })}
        </div>
        <div className={styles["right-wrapper"]}>
          <div>
            <h3 className={styles.title}>Добавить студентов</h3>
            <p className={styles.text}>
              Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email
              студентов, вторая колонка — номер когорты.
            </p>
            <form method='post' encType='multipart/form-data'>
              <label className={styles.inputfile}>
                <input
                  type='file'
                  accept={".csv"}
                  onChange={handleFileLoad}
                  className={styles.fileButton}
                  name=''
                  multiple
                />
                <span>Выберите файл</span>
              </label>
            </form>
          </div>
          {isHiddenAlert && (
            <div className={styles["alert-error"]}>
              <Text>Проверьте, что загруженные данные корректны и сохраните их или удалите и загрузите заново.</Text>
              <ul className={styles["alert-error__list-btn"]}>
                <li>
                  <button
                    className={[styles["alert-error__btn"], styles["alert-error__btn_type_alert"]].join(" ")}
                    onClick={() => {
                      setStudentsNew([]);
                    }}
                  >
                    Удалить
                  </button>
                </li>
                <li>
                  <button
                    className={[styles["alert-error__btn"], styles["alert-error__btn_type_normal"]].join(" ")}
                    onClick={() => {
                      setColor("#100C34");
                      setBorder("1px solid #83828F");
                      setIsHiddenAlert(false);
                      studentsNew.map((el) => {
                        console.log(el);
                        return mutationData(USERS_URL, "POST", el);
                      });
                    }}
                  >
                    Сохранить
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
