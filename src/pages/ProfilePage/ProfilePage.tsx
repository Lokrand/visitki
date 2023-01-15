import React, { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

import styles from "./profilepage.module.scss";

import Input from "../../components/Input/Input";
import InputTextArea from "../../components/InpuTextArea/InpuTextArea";
import InputFile from "../../components/InputFile/InputFile";
import InputSelect from "../../components/InputSelect/InputSelect";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import { Text } from "../../components/UI/Text";

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

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <main className={styles.container}>
      <form action='' className={styles.form} onSubmit={onSubmit}>
        <ProfilePhoto setValue={setValue} form={form} />
        <Input
          label='Дата рождения *'
          inputName='birthday'
          handleChange={handleChange}
          values={form.birthday}
          required={true}
        />
        <InputSelect
          label='Выберите город *'
          inputName='city'
          options={cities}
          setValue={setValue}
          form={form}
          required={true}
        />
        <Input
          label='Ник в телеграм'
          inputName='telegram'
          handleChange={handleChange}
          values={form.telegram}
          required={false}
        />
        <Input
          label='Ник на гитхабе'
          inputName='github'
          handleChange={handleChange}
          values={form.github}
          required={false}
        />
        <InputSelect
          label='Выберите шаблон'
          inputName='template'
          options={template}
          setValue={setValue}
          form={form}
          required={false}
        />
        <InputTextArea
          label='Девиз, цитата'
          inputName='quote'
          placeholder='Не более 100 символов'
          maxLength={100}
          handleChange={handleChange}
          values={form.quote}
        />
        <div>
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
        <div>
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
        <Text>Поля, отмеченные звездочкой, обязательны для заполнения</Text>
        <button>Сохранить</button>
      </form>
    </main>
  );
};
