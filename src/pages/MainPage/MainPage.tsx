import React, { FC, useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import styles from "./MainPageStyles.module.scss";

import { Card } from "../../components/Card/Card";
import { useAuth } from "../../hook/useAuth";
import { useFetch } from "../../hook/useFetch";
import { Arrow } from "../../icons/Arrow/Arrow";
import { getAllProfiles } from "../../utils/api";
import { ADMIN_ROUTE, MAP_ROUTE } from "../../utils/constants";
import { TFullProfile } from "../../utils/types";

interface IMainPage {
  cohort?: string;
}

export const MainPage: FC<IMainPage> = ({ cohort }) => {
  const [filterModalActive, setFilterModalActive] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Все города");
  const { user } = useAuth();
  const navigate = useNavigate();

  const { url } = getAllProfiles();
  const { data, error, isloading } = useFetch(url);

  useEffect(() => {
    if (user && user.role === "curator") navigate(ADMIN_ROUTE, { replace: true });
  }, []);

  if (isloading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Студенты не найдены</h1>;

  let students: TFullProfile[] = [];
  let cities: string[] = [];
  if (data) {
    students = data.items;
    if (cohort) students = students.filter((el) => el.cohort === cohort);
    for (let i = 0; i < students.length; i++) {
      if (cities.includes(students[i].profile.city.name)) continue;
      else cities.push(students[i].profile.city.name);
    }
    if (currentFilter === "Все города") {
      students = data.items;
      if (cohort) students = students.filter((el) => el.cohort === cohort);
    } else {
      students = students.filter((el) => el.profile.city.name === currentFilter);
      cities = cities.filter((el) => el !== currentFilter);
    }
  }

  const handleInputActive = () => {
    setFilterModalActive(!filterModalActive);
  };

  return (
    <section className={styles.cohort}>
      <div className={styles.cohort__header}>
        <div className={styles.cohort__cities} onClick={handleInputActive}>
          <div className={styles.cohort__filter}>{currentFilter}</div>
          <span
            className={
              filterModalActive ? `${styles.cohort__arrow} ${styles.cohort__arrow_active}` : styles.cohort__arrow
            }
          >
            <Arrow />
          </span>
          <div
            className={
              filterModalActive ? `${styles.cohort__modal} ${styles.cohort__modal_active}` : styles.cohort__modal
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
            {cities.map((el, index) => {
              return (
                <div
                  key={index}
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
        <NavLink to={MAP_ROUTE} className={styles.cohort__link}>
          Посмотреть на карте
        </NavLink>
      </div>
      <div className={styles.cohort__students}>
        {students.map((student) => {
          return (
            <Card
              key={student._id}
              id={student._id}
              name={student.profile.name}
              city={student.profile.city.name}
              img={student.profile.photo}
              cohort={cohort}
            />
          );
        })}
      </div>
    </section>
  );
};
