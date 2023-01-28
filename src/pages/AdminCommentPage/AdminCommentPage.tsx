import React, { ChangeEventHandler, FC, MouseEventHandler, useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import styles from "./AdminCommentPageStyles.module.scss";

import { CommentFrame } from "../../components/FrameComment/FrameComment";
import { useAuth } from "../../hook/useAuth";
import useDebounce from "../../hook/useDebounce";
import { useFetch } from "../../hook/useFetch";
import { useMutation } from "../../hook/useMutation";
import { useSearch } from "../../hook/useSearch";
import { Cross } from "../../icons/Cross/Cross";
import { getAllComments } from "../../utils/api";
import { COMMENTS_URL, MAIN_ROUTE } from "../../utils/constants";
import { TComment } from "../../utils/types";

export const AdminCommentPage: FC = () => {
  const search = useSearch();
  const debouncedSearch = useDebounce(search.searchData, 500);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutationData } = useMutation();
  const { url } = getAllComments();
  const { data, isloading, error } = useFetch(url);
  const [comments, setComments] = useState<TComment[]>([]);

  useEffect(() => {
    if (user && user.role === "student") navigate(MAIN_ROUTE, { replace: true });
    if (data) {
      setComments(data.items);
    }
  }, [data]);

  let renderComment: TComment[] = [];
  const [searchParam, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [displayStyle, setDisplayStyle] = React.useState({ display: "none" });
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    debouncedSearch(url, { limit: 10, search: target.value });
    setValue(target.value);
    target.value.length ? setDisplayStyle({ display: "block" }) : setDisplayStyle({ display: "none" });
  };

  const filter = () => {
    return (renderComment = comments.filter((comment) => {
      if (comment.from.name.match(searchParam)) {
        return comment;
      }
      if (comment.to.name.match(searchParam)) {
        return comment;
      }
    }));
  };

  useMemo(() => {
    filter();
  }, [searchParam]);

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleButtonClick = () => {
    setValue("");
    setDisplayStyle({ display: "none" });
  };

  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseleave" && !focus) {
      setHover(false);
    } else setHover(true);
  };

  const checkTarget = (target: string) => {
    if (target === "edu") {
      return (target = "из блока Учеба");
    }
    if (target === "hobby") {
      return (target = "из блока Увлечения");
    }
    if (target === "status") {
      return (target = "из блока Семья");
    }
    if (target === "job") {
      return (target = "из блока Сфера");
    }
  };

  const handleDelete = (id: string) => {
    mutationData(`${COMMENTS_URL}/${id}`, "DELETE");
    setComments([...comments.filter((el) => el._id !== id)]);
  };

  if (isloading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Не удалось получить информацию о комментариях с сервера</h1>;

  return (
    <section className={styles["main-container"]}>
      <div className={styles.container}>
        <Link to='/admin/users' className={styles.title}>
          Студенты
        </Link>
        <Link to='/admin' className={styles.title}>
          Комментарии
        </Link>
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Фильтровать</label>
        <div className={styles.xfield}>
          <input
            type='text'
            name='filter'
            value={searchParam}
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
      </div>

      {comments.length !== 0 ? (
        <div className={styles.main}>
          <p className={styles.column}>Когорта</p>
          <p className={styles.column}>Дата</p>
          <p className={styles.column}>Отправитель</p>
          <p className={styles.column}>Получатель</p>
          <p className={styles.column}>Откуда комментарий</p>
          <p className={styles.column}>Текст комментария</p>
        </div>
      ) : (
        <h1 className={styles.alert}>Не найдено ни одного комментария</h1>
      )}

      {comments &&
        comments.map((el: TComment) => {
          return (
            <CommentFrame
              key={el._id}
              id={el._id}
              userId={el.from._id}
              commentDate={"20.12.2022"}
              target={checkTarget(el.target)}
              from={el.from.name}
              to={el.to.name}
              text={el.text}
              handleDelete={handleDelete}
            />
          );
        })}
    </section>
  );
};
