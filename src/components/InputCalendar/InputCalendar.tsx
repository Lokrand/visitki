import ru from "date-fns/locale/ru";
import React, { FC, forwardRef, useRef, useState, MouseEventHandler, SetStateAction, Dispatch } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";

import "../../vendor/stylesheets/datepicker.scss";
import styles from "./InputCalendar.module.scss";

import { ArrowCalendar } from "../../icons/ArrowCalendar/ArrowCalendar";
import { Calendar } from "../../icons/Calendar/Calendar";
import { IForm } from "../../utils/types";

interface IInputCalendar {
  inputName: string;
  years: number[];
  months: string[];
  error: string;
  setValue: Dispatch<SetStateAction<IForm>>;
  form: IForm;
  setIsErrorBirthday: Dispatch<SetStateAction<boolean>>;
  isErrorBirthday: boolean;
}

const InputCalendar: FC<IInputCalendar> = ({
  inputName,
  years,
  months,
  setValue,
  form,
  error,
  setIsErrorBirthday,
  isErrorBirthday,
}) => {
  registerLocale("ru", ru);
  const [hover, setHover] = useState(false);
  const [startDate, setStartDate] = useState<Date | null | undefined>(null);
  const [isMonth, setIsMonth] = useState(false);
  const [isYear, setIsYear] = useState(false);
  const ref = useRef();
  const [yearValue, setYearValue] = useState<string | number>("");
  const [monthValue, setMonthValue] = useState("");
  const mediaQuery = window.matchMedia("(max-width: 414px)");
  const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.type === "mouseleave") {
      setHover(false);
    } else setHover(true);
  };

  const handleYearChange = () => {
    setYearValue(yearValue);
  };
  const handleMonthChange = () => {
    setMonthValue(monthValue);
  };
  const handleMonthOnclick = (option: string) => {
    setMonthValue(option);
    setIsMonth(false);
  };
  const handleYearOnclick = (option: string | number) => {
    setYearValue(option);
    setIsYear(false);
  };

  const CustomInput = forwardRef<unknown, { value: any; onClick: any }>(({ value, onClick }, ref) => (
    <div className={styles.container}>
      <label className={styles.input__label}>Дата рождения *</label>
      <input
        name={inputName}
        value={value}
        onClick={() => {
          if (mediaQuery.matches) {
            onClick();
            setIsErrorBirthday(false);
          } else setIsErrorBirthday(true);
        }}
        onChange={(e) => {
          if (e.target.value === "") {
            setIsErrorBirthday(true);
          }
          setIsErrorBirthday(false);
        }}
        className={`${styles.input} 
                ${hover ? styles.input_status_active : styles.input_status_default}`}
        onMouseEnter={handleInputHover}
        onMouseLeave={handleInputHover}
      />
      <span
        className={styles.input__icon}
        onClick={() => {
          onClick();
          setIsErrorBirthday(false);
        }}
      >
        <Calendar />
      </span>
      <span className={`${!isErrorBirthday ? styles.input__error : styles.input__error_active}`}>{error}</span>
    </div>
  ));

  const handleButtonMonthOnclick = () => {
    handleToggleMonth();
  };

  const handleToggleMonth = () => {
    setIsMonth(!isMonth);
  };

  const handleButtonYearOnclick = () => {
    handleToggleYear();
  };

  const handleToggleYear = () => {
    setIsYear(!isYear);
  };

  return (
    <>
      <DatePicker
        shouldCloseOnSelect={false}
        locale='ru'
        popperPlacement='bottom-end'
        calendarClassName={styles.calendar}
        dateFormat='dd.MM.yyyy'
        maxDate={new Date()}
        selected={startDate}
        onChange={(date) => {
          setIsErrorBirthday(false);
          setValue({ ...form, [inputName]: date });
          setStartDate(date);
        }}
        customInput={<CustomInput value={undefined} onClick={undefined} />}
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className={styles.header}>
            <div className={styles.years}>
              <label></label>
              <input
                type='text'
                className={styles.input_year}
                onChange={handleYearChange}
                value={yearValue}
                placeholder={"Год"}
              />
              <span
                className={`${styles.button_year} ${!isYear ? styles.button_year_default : styles.button_year_active}`}
                onClick={handleButtonYearOnclick}
              >
                <ArrowCalendar />
              </span>
              <div
                className={`${styles.wrapper_year} ${
                  !isYear ? styles.wrapper_year_default : styles.wrapper_year_active
                }`}
              >
                <ul className={styles.list}>
                  {years.map((year, index) => {
                    return (
                      <li
                        className={styles.list__option}
                        key={index}
                        onClick={() => {
                          changeYear(year);
                          handleYearOnclick(year);
                        }}
                      >
                        {year}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.months}>
              <label></label>
              <input
                type='text'
                className={styles.input_month}
                onChange={handleMonthChange}
                value={monthValue}
                placeholder={"Месяц"}
              />
              <span
                className={`${styles.button_month} ${
                  !isMonth ? styles.button_month_default : styles.button_month_active
                }`}
                onClick={handleButtonMonthOnclick}
              >
                <ArrowCalendar />
              </span>
              <div
                className={`${styles.wrapper_month} ${
                  !isMonth ? styles.wrapper_month_default : styles.wrapper_month_active
                }`}
              >
                <ul className={styles.list}>
                  {months.map((month, index) => {
                    return (
                      <li
                        className={styles.list__option}
                        key={index}
                        onClick={() => {
                          changeMonth(months.indexOf(month));
                          handleMonthOnclick(month);
                        }}
                      >
                        {month}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default InputCalendar;
