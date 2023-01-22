import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Card.module.scss";

import { useFetch } from "../../hook/useFetch";
import { getFullProfile } from "../../utils/api";
import { ModalComments } from "../ModalComments/ModalComments";
import { Chat } from "../UI/Chat/Chat";

interface ICard {
  id: string;
  name: string;
  city: string;
  img: string;
}

export const Card: FC<ICard> = ({ id, name, city, img }) => {
  const [modalCommentsActive, setModalCommentsActive] = useState(false);
  const [hoverActive, setHoverActive] = useState(false);
  const handleChatClick = () => {
    setModalCommentsActive(!modalCommentsActive);
  };

  const { url } = getFullProfile(id);
  const { data } = useFetch(url);

  let counter = 0;
  if (data) counter = data.reactions;
  // console.log("data", data);
  const handleMouseEnter = () => {
    setHoverActive(true);
  };

  const handleMouseLeave = () => {
    setHoverActive(false);
    setModalCommentsActive(false);
  };
  const navigate = useNavigate();
  const routeToDetails = () => {
    navigate(`detail/${id}`);
  };

  const closeModal = () => {
    setModalCommentsActive(false);
  };

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }
    if (modalCommentsActive) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [modalCommentsActive, closeModal]);
  return (
    <div className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={hoverActive ? styles["card__image-wrapper"] : ""}>
        <img onClick={routeToDetails} src={img} alt='Фотография студента' className={styles.card__image} />
      </div>
      <h2
        onClick={routeToDetails}
        className={hoverActive ? `${styles.card__name} ${styles.card__name_active}` : styles.card__name}
      >
        {name}
      </h2>
      <p className={styles.card__city} onClick={routeToDetails}>
        {city}
      </p>
      {hoverActive && <Chat counter={counter} forImage={true} onClick={handleChatClick} />}
      <ModalComments active={modalCommentsActive} id={id} modalFor='main' />
    </div>
  );
};
