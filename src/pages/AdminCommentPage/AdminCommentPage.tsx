import React, { FC, FormEventHandler, MouseEventHandler, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import styles from "./AdminCommentPageStyles.module.scss";

import { CommentFrame } from "../../components/FrameComment/FrameComment";
import useDebounce from "../../hook/useDebounce";
import { useFetch } from "../../hook/useFetch";
import { useSearch } from "../../hook/useSearch";
import { Cross } from "../../icons/Cross/Cross";
import { getAllComments } from "../../utils/api";

export const AdminCommentPage: FC = () => {
  const search = useSearch();
  const debouncedSearch = useDebounce(search.searchData, 500);

  const { url } = getAllComments();
  const { data, isloading, error } = useFetch(url);
  let comments: any[] = [];
  let renderComment: any[] = [];

  if (data) {
    comments = data.items;
  }
  const [searchParam, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [displayStyle, setDisplayStyle] = React.useState({ display: "none" });
  const handleInputChange: FormEventHandler<HTMLInputElement> | undefined = (e) => {
    const target = e.target as HTMLInputElement;
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

  if (isloading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Не удалось получить информацию о комментариях с сервера</h1>;

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

      <div className={styles.main}>
        <p className={styles.column}>Когорта</p>
        <p className={styles.column}>Дата</p>
        <p className={styles.column}>Отправитель</p>
        <p className={styles.column}>Получатель</p>
        <p className={styles.column}>Откуда комментарий</p>
        <p className={styles.column}>Текст комментария</p>
      </div>
      {comments.map((el: any) => {
        return (
          <CommentFrame
            key={el._id}
            id={el.from._id}
            commentDate={"20.12.2022"}
            target={checkTarget(el.target)}
            from={el.from.name}
            to={el.to.name}
            text={el.text}
          />
        );
      })}
    </section>
  );
};
