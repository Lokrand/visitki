import React, { FC } from "react";

import styles from "./Gallery.module.scss";

import { Card } from "../../components/Card/Card";
import { students } from "../../utils/students";

export const Gallery: FC = () => {
  return (
    <section className={styles.gallery}>
      <div className={styles.gallery__header}>
        <input type='text' placeholder='Все города' list='cityname' className={styles.gallery__cities} />
        <datalist id='cityname'>
          <option value='Boston' />
          <option value='Cambridge' />
        </datalist>
        <p>Посмотреть на карте</p>
      </div>
      <div className={styles.gallery__students}>
        {students.map((student) => {
          return <Card name={student.name} city={student.city} img={student.img} />;
        })}
      </div>
    </section>
  );
};