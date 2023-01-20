import React, { FC, useState } from "react";

import { NavLink } from "react-router-dom";

import styles from "./cohortPage.module.scss";

import { Card } from "../../components/Card/Card";
import { Arrow } from "../../icons/Arrow/Arrow";
import { students } from "../../utils/students";

export const CohortPage: FC = () => {
  const [filterModalActive, setFilterModalActive] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Все города");

  const handleInputActive = () => {
    setFilterModalActive(!filterModalActive);
  };

  // const handleFilter: = (city: string) => {
  //   setCurrentFilter(city);
  // };
  // тестовый список городов пока что ы)
  const cities = ["Санкт-Петербург", "Москва", "Иркутск", "Казань"];
  return (
    <section className={styles.cohort}>
      <div className={styles.cohort__header}>
        <div className={styles.cohort__cities} onClick={handleInputActive}>
          <div className={styles.cohort__filter}>{currentFilter}</div>
          <span
            className={
              filterModalActive ? styles.cohort__arrow : `${styles.cohort__arrow} ${styles.cohort__arrow_active}`
            }
          >
            <Arrow />
          </span>
          <div
            className={
              filterModalActive ? styles.cohort__modal : `${styles.cohort__modal} ${styles.cohort__modal_active}`
            }
          >
            {currentFilter === "Все города" ? null : (
              <div
                className={styles.cohort__city}
                onClick={() => {
                  setCurrentFilter("Все города");
                }}
              >
                Все города
              </div>
            )}
            {cities.map((el) => {
              return (
                <div
                  className={styles.cohort__city}
                  onClick={() => {
                    setCurrentFilter(el);
                  }}
                >
                  {el}
                </div>
              );
            })}
          </div>
        </div>
        <NavLink to='/' className={styles.cohort__link}>
          Посмотреть на карте
        </NavLink>
      </div>
      <div className={styles.cohort__students}>
        {students.map((student, index) => {
          return <Card key={index} name={student.name} city={student.city} img={student.img} />;
        })}
      </div>
    </section>
  );
};
