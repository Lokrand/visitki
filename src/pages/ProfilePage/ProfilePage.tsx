import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from "react";

import styles from "./profilepage.module.scss";

import Input from "../../components/Input/Input";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import InputTextArea from "../../components/InpuTextArea/InpuTextArea";
import InputFile from "../../components/InputFile/InputFile";
import InputSelect from "../../components/InputSelect/InputSelect";
import InputSuggestView from "../../components/InputSuggestView/InputSuggestView";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import { Button } from "../../components/UI/Button";
import { Text } from "../../components/UI/Text";
import { useFetch } from "../../hook/useFetch";
import { getFullProfile } from "../../utils/api";

import { years, months } from "../../utils/calendar";

import { template } from "../../utils/template";
import { TForm } from "../../utils/types";

export const ProfilePage: FC = () => {
  const { url, method } = getFullProfile("abfccdaa23e0bd1c4448d2f3");
  const { data, error, loading } = useFetch(url, method);

  const [form, setValue] = useState({
    photo: "",
    birthday: "",
    city: {
      name: "",
      geocode: [] as number[],
    },
    telegram: "",
    github: "",
    template: "" as string | null,
    quote: "",
    hobbyImage: "",
    hobby: "",
    statusImage: "",
    status: "",
    job: "",
    edu: "",
  });
  useEffect(() => {
    if (data) {
      const { profile, info } = data;
      setValue({
        photo: profile.photo,
        birthday: "1956-05-26T13:51:50.417-07:00",
        city: {
          name: profile.city.name,
          geocode: profile.city.geocode,
        },
        telegram: profile.telegram,
        github: profile.github,
        template: data.profile.template,
        quote: profile.quote,
        hobbyImage: info.hobby.image,
        hobby: info.hobby.text,
        statusImage: info.status.image,
        status: info.status.text,
        job: info.job.text,
        edu: info.edu.text,
      });
    }
  }, [data]);
  const [isErrorCity, setIsErrorCity] = useState(false);
  const [isErrorBirthday, setIsErrorBirthday] = useState(false);
  const [isErrorPhoto, setIsErrorPhoto] = useState(false);
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(form);
    validate();
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const validate = () => {
    if (form.photo === "") {
      setIsErrorPhoto(true);
      scrollToTop();
    }
    if (form.city.name === "") {
      console.log(form.city.name === "");
      setIsErrorCity(true);
      scrollToTop();
    }
    if (form.birthday === "") {
      setIsErrorBirthday(true);
      scrollToTop();
    }
  };

  return (
    <main className={styles.container}>
      <form action='' className={styles.form} onSubmit={onSubmit} noValidate>
        <ProfilePhoto setValue={setValue} form={form} isErrorPhoto={isErrorPhoto} setIsErrorPhoto={setIsErrorPhoto} />
        <InputCalendar
          inputName='birthday'
          setValue={setValue}
          form={form}
          years={years}
          months={months}
          error='Поле обязательно для заполнения'
          isErrorBirthday={isErrorBirthday}
          setIsErrorBirthday={setIsErrorBirthday}
        />
        <InputSuggestView
          setValue={setValue}
          form={form}
          isErrorCity={isErrorCity}
          setIsErrorCity={setIsErrorCity}
          error='Поле обязательно для заполнения'
        />
        <Input label='Ник в телеграм' inputName='telegram' setValue={setValue} form={form} />
        <Input label='Ник на гитхабе' inputName='github' setValue={setValue} form={form} />
        <InputSelect label='Выберите шаблон' inputName='template' options={template} setValue={setValue} form={form} />
        <InputTextArea
          label='Девиз, цитата'
          inputName='quote'
          placeholder='Не более 100 символов'
          maxLength={100}
          handleChange={handleChange}
          values={form.quote}
        />
        <div className={styles.wrapper}>
          <InputFile
            label='Увлечения, досуг, интересы'
            inputName='hobbyImage'
            requirements='Рекомендуемый размер фото 230х129'
            id='hobbyImage'
            htmlFor='hobbyImage'
            setValue={setValue}
            form={form}
          />
          <InputTextArea
            inputName='hobby'
            placeholder='Не более 300 символов'
            maxLength={300}
            handleChange={handleChange}
            values={form.hobby}
          />
        </div>
        <div className={styles.wrapper}>
          <InputFile
            label='Семья, статус, домашние животные'
            inputName='statusImage'
            requirements='Рекомендуемый размер фото 230х129'
            id='statusImage'
            htmlFor='statusImage'
            setValue={setValue}
            form={form}
          />
          <InputTextArea
            inputName='status'
            placeholder='Не более 300 символов'
            maxLength={300}
            handleChange={handleChange}
            values={form.status}
          />
        </div>
        <InputTextArea
          label='Из какой сферы пришёл? Кем работаешь?'
          inputName='job'
          placeholder='Не более 300 символов'
          maxLength={300}
          handleChange={handleChange}
          values={form.job}
        />
        <InputTextArea
          label='Почему решил учиться на веб-разработчика?'
          inputName='edu'
          placeholder='Не более 300 символов'
          maxLength={300}
          handleChange={handleChange}
          values={form.edu}
        />
        <Text>Поля, отмеченные звездочкой, обязательны для&nbsp;заполнения</Text>
        <Button size={"l"}>Сохранить</Button>
      </form>
    </main>
  );
};
