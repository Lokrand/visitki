import React, { FC, FormEventHandler, MouseEventHandler, useCallback, useMemo, useRef, useState } from "react";

import styles from "./admincommentpage.module.scss";

import useDebounce from "../../hook/useDebounce";
import { useFetch } from "../../hook/useFetch";
import { Cross } from "../../icons/Cross/Cross";
import { getAllComments } from "../../utils/api";
import { COMMENTS_URL } from "../../utils/constants";

interface ICommentFrame {
  birthday: string;
  commentDate: string;
  from: string;
  to: string;
  target: any;
  text: string;
}
// !!!!Для тестирования
const commentsArr = [
  {
    _id: "c824a2de0b675b0acb5a2923",
    from: {
      _id: "e638ad9bce6d7efd1b5b035b",
      name: "Elvira Grady",
      email: "Ana93@hotmail.com",
    },
    target: "hobby",
    text: "Laborum omnis harum modi omnis architecto ipsam adipisci dolore.",
    to: {
      _id: "abfccdaa23e0bd1c4448d2f3",
      name: "Ricky Fadel",
      email: "Chaim.Armstrong@gmail.com",
    },
  },
  {
    _id: "bad224dbc4a601caff7e0b2c",
    from: {
      _id: "e638ad9bce6d7efd1b5b035b",
      name: "Kkkra Grady",
      email: "Allla93@hotmail.com",
    },
    target: "edu",
    text: "Soluta consectetur tempore eaque modi sequi autem ducimus.",
    to: {
      _id: "abfccdaa23e0bd1c4448d2f3",
      name: "Poppy Bob",
      email: "Chaim.Armstrong@gmail.com",
    },
  },
  {
    _id: "c2f15f9b4315bb20aebf9a1d",
    from: {
      _id: "e638ad9bce6d7efd1b5b035b",
      name: "Peter Grady",
      email: "Anita93@hotmail.com",
    },
    target: "status",
    text: "Eveniet excepturi commodi eaque dignissimos quae nesciunt nam dolorum.",
    to: {
      _id: "abfccdaa23e0bd1c4448d2f3",
      name: "Ricky Fadel",
      email: "Chaim.Armstrong@gmail.com",
    },
  },
  {
    _id: "38eb4bbe3da2fcf2d4cfcd59",
    from: {
      _id: "e638ad9bce6d7efd1b5b035b",
      name: "John Grady",
      email: "Anita93@hotmail.com",
    },
    target: "job",
    text: "Accusantium neque minus tempora.",
    to: {
      _id: "abfccdaa23e0bd1c4448d2f3",
      name: "Ricky Marty",
      email: "Chaim.Armstrong@gmail.com",
    },
  },
  {
    _id: "0ebcdb97d72b2b17345c30c8",
    from: {
      _id: "e638ad9bce6d7efd1b5b035b",
      name: "Elvira Grady",
      email: "Anita93@hotmail.com",
    },
    target: null,
    text: "Libero ad tempora exercitationem numquam adipisci quibusdam doloremque incidunt.",
    to: {
      _id: "abfccdaa23e0bd1c4448d2f3",
      name: "Ricky Fadel",
      email: "Chaim.Armstrong@gmail.com",
    },
  },
];

const CommentFrame: FC<ICommentFrame> = ({ birthday, commentDate, from, to, target, text }) => {
  return (
    <>
      <div className={styles.frames}>
        <p className={`${styles.frame}`}>{birthday}</p>
        <p className={`${styles.frame}`}>{commentDate}</p>
        <p className={`${styles.frame}`}>{from}</p>
        <p className={`${styles.frame}`}>{to}</p>
        <p className={`${styles.frame}`}>{target}</p>
        <p className={`${styles.frame}`}>{text}</p>
        <Cross />
      </div>
    </>
  );
};

export const AdminCommentPage: FC = () => {
  const search = (query: string) => {
    fetch(`${COMMENTS_URL}?offset=38055382&limit=20&search=` + query).then((res: any) =>
      res.json().then((res: any) => console.log(res)),
    );
  };
  const debouncedSearch = useDebounce(search, 500);
  const { url } = getAllComments();
  const { data } = useFetch(url);
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
    debouncedSearch(target.value);
    setValue(target.value);
    target.value.length ? setDisplayStyle({ display: "block" }) : setDisplayStyle({ display: "none" });
  };

  const filter = () => {
    return (renderComment = commentsArr.filter((comment) => {
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
  const { url, method } = getAllComments();
  const { data, error, loading } = useFetch(url, method);

  if (error) return <h1>Студенты не найдены</h1>;
  let commentsData: any[] = [];
  let comments: any = [];

  if (data) {
    commentsData = data.items;
    commentsData = commentsData.filter((el) => comments.push(el));
  }
  return (
    <section>
      <div className={styles.container}>
        <a href='/admin/users' className={styles.title}>
          Студенты
        </a>
        <a href='/admin' className={styles.title}>
          Комментарии
        </a>
        <label className={styles.label}>Фильтровать</label>
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
      <div className={styles.main}>
        <p className={styles.column}>Когорта</p>
        <p className={styles.column}>Дата</p>
        <p className={styles.column}>Отправитель</p>
        <p className={styles.column}>Получатель</p>
        <p className={styles.column}>Откуда комментарий</p>
        <p className={styles.column}>Текст комментария</p>
      </div>
      {data && renderComment.length > 0
        ? renderComment.map((el: any) => {
            return (
              <>
                <CommentFrame
                  key={el._id}
                  birthday={"1853"}
                  commentDate={"20.12.2022"}
                  target={checkTarget(el.target)}
                  from={el.from.name}
                  to={el.to.name}
                  text={el.text}
                />
              </>
            );
          })
        : commentsArr.map((el: any) => {
            return (
              <>
                <CommentFrame
                  key={el._id}
                  birthday={"1853"}
                  commentDate={"20.12.2022"}
                  target={checkTarget(el.target)}
                  from={el.from.name}
                  to={el.to.name}
                  text={el.text}
                />
              </>
            );
          })}
    </>
  );
};
