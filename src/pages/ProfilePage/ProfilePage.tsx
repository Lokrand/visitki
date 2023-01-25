import React, { FC, FormEventHandler, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import styles from "./ProfilePageStyles.module.scss";

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

import { PROFILES_URL } from "../../utils/constants";
import { template } from "../../utils/template";
import { TForm } from "../../utils/types";

export const ProfilePage: FC = () => {
  const { id } = useParams();
  const { url } = getFullProfile(id);
  const { data, error, isloading } = useFetch(url);
  const [form, setValue] = useState({
    profile: {
      name: "",
      photo: "",
      city: {
        name: "",
        geocode: [] as number[],
      },
      birthday: "",
      quote: "",
      telegram: "",
      github: "",
      template: "",
    },
    info: {
      hobby: {
        text: "",
        image: "" as string | null,
      },
      status: {
        text: "",
        image: "" as string | null,
      },
      job: {
        text: "",
        image: "" as string | null,
      },
      edu: {
        text: "",
        image: "" as string | null,
      },
    },
  });
  useEffect(() => {
    if (data) {
      const { profile, info } = data;
      setValue({
        profile: {
          name: profile.name,
          photo: profile.photo,
          city: {
            name: profile.city.name,
            geocode: profile.city.geocode,
          },
          birthday: "1956-05-26T13:51:50.417-07:00", //заглушка, т.к. календарь поддерживает только объект Date
          quote: profile.quote,
          telegram: profile.telegram,
          github: profile.github,
          template: data.profile.template,
        },
        info: {
          hobby: {
            text: info.hobby.text,
            image: info.hobby.image,
          },
          status: {
            text: info.status.text,
            image: info.status.image,
          },
          job: {
            text: info.job.text,
            image: "",
          },
          edu: {
            text: info.edu.text,
            image: "",
          },
        },
      });
    }
  }, [data]);
  const [isErrorCity, setIsErrorCity] = useState(false);
  const [isErrorBirthday, setIsErrorBirthday] = useState(false);
  const [isErrorPhoto, setIsErrorPhoto] = useState(false);
  //!!!!!!Тестовый вариант отправки!!!!!
  const token = "y0_AgAAAABFA_OnAAj_OgAAAADZpb4FW6SfL6mCS3mlNzXjWiTo39dRbJo";
  function checkResponse(res: any) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
  function request(url: string, options: any) {
    return fetch(url, options).then(checkResponse);
  }
  function changeUserProfile(profile: any, info: any) {
    return request(`${PROFILES_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profile, info }),
    });
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validate();
    if (form.profile.photo !== "" && form.profile.city.name !== "" && form.profile.birthday !== "") {
      changeUserProfile(form.profile, form.info);
    }
  };
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const validate = () => {
    if (form.profile.photo === "") {
      setIsErrorPhoto(true);
      scrollToTop();
    }
    if (form.profile.city.name === "") {
      setIsErrorCity(true);
      scrollToTop();
    }
    if (form.profile.birthday === "") {
      setIsErrorBirthday(true);
      scrollToTop();
    }
  };

  if (isloading) return <h1>Идет загрузка данных...</h1>;
  if (error) return <h1>Пользователь не найден</h1>;
  return (
    <section className={styles.container}>
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
          setValue={setValue}
          form={form}
        />
        <div className={styles.wrapper}>
          <InputFile
            label='Увлечения, досуг, интересы'
            inputName='hobby'
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
            setValue={setValue}
            form={form}
          />
        </div>
        <div className={styles.wrapper}>
          <InputFile
            label='Семья, статус, домашние животные'
            inputName='status'
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
            setValue={setValue}
            form={form}
          />
        </div>
        <InputTextArea
          label='Из какой сферы пришёл? Кем работаешь?'
          inputName='job'
          placeholder='Не более 300 символов'
          maxLength={300}
          setValue={setValue}
          form={form}
        />
        <InputTextArea
          label='Почему решил учиться на веб-разработчика?'
          inputName='edu'
          placeholder='Не более 300 символов'
          maxLength={300}
          setValue={setValue}
          form={form}
        />
        <Text>Поля, отмеченные звездочкой, обязательны для&nbsp;заполнения</Text>
        <Button size={"l"}>Сохранить</Button>
      </form>
    </section>
  );
};
