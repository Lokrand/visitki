import React, { FC } from "react";

import styles from "./cohortPage.module.scss";

import { Card } from "../../components/Card/Card";
import { students } from "../../utils/students";

export const CohortPage: FC = () => {
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
        {students.map((student, index) => {
          return <Card key={index} name={student.name} city={student.city} img={student.img} />;
        })}
      </div>
    </section>
  );
};
