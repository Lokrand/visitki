import React, { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

import styles from "./profilepage.module.scss";

import Input from "../../components/Input/Input";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import InputTextArea from "../../components/InpuTextArea/InpuTextArea";
import InputFile from "../../components/InputFile/InputFile";
import InputSelect from "../../components/InputSelect/InputSelect";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import { Button } from "../../components/UI/Button";
import { Text } from "../../components/UI/Text";

import { years, months } from "../../utils/calendar";
import { cities } from "../../utils/cities";

import { template } from "../../utils/template";

export const ProfilePage: FC = () => {
  const [form, setValue] = useState({
    photo: "",
    birthday: "",
    city: "",
    telegram: "",
    github: "",
    template: "",
    quote: "",
    hobbyImage: "",
    hobby: "",
    statusImage: "",
    status: "",
    job: "",
    edu: "",
  });
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
    if (form.city === "") {
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
        <InputSelect
          label='Выберите город *'
          inputName='city'
          options={cities}
          setValue={setValue}
          error='Поле обязательно для заполнения'
          form={form}
          isErrorCity={isErrorCity}
          setIsErrorCity={setIsErrorCity}
        />
        <Input label='Ник в телеграм' inputName='telegram' handleChange={handleChange} values={form.telegram} />
        <Input label='Ник на гитхабе' inputName='github' handleChange={handleChange} values={form.github} />
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
