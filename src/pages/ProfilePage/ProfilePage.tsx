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
import { useMutation } from "../../hook/useMutation";
import { getFullProfile } from "../../utils/api";

import { years, months } from "../../utils/calendar";

import { PROFILES_URL } from "../../utils/constants";
import { template } from "../../utils/template";

export const ProfilePage: FC = () => {
  const { id } = useParams();
  const { url } = getFullProfile(id);
  const { mutationData } = useMutation();
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

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validate();
    if (form.profile.photo !== "" && form.profile.city.name !== "" && form.profile.birthday !== "") {
      mutationData(`${PROFILES_URL}/${id}`, "PATCH", form);
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
          value={form.profile.quote}
          onChange={(e) => {
            setValue({ ...form, profile: { ...form.profile, quote: e.target.value } });
          }}
          label='Девиз, цитата'
          placeholder='Не более 100 символов'
          maxLength={100}
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
            value={form.info.hobby.text}
            onChange={(e) => {
              setValue({
                ...form,
                info: { ...form.info, hobby: { ...form.info.hobby, text: e.target.value } },
              });
            }}
            placeholder='Не более 300 символов'
            maxLength={300}
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
            value={form.info.status.text}
            onChange={(e) => {
              setValue({
                ...form,
                info: { ...form.info, status: { ...form.info.status, text: e.target.value } },
              });
            }}
            placeholder='Не более 300 символов'
            maxLength={300}
          />
        </div>
        <InputTextArea
          value={form.info.job.text}
          onChange={(e) => {
            setValue({
              ...form,
              info: { ...form.info, job: { ...form.info.job, text: e.target.value } },
            });
          }}
          label='Из какой сферы пришёл? Кем работаешь?'
          placeholder='Не более 300 символов'
          maxLength={300}
        />
        <InputTextArea
          value={form.info.edu.text}
          onChange={(e) => {
            setValue({
              ...form,
              info: { ...form.info, edu: { ...form.info.edu, text: e.target.value } },
            });
          }}
          label='Почему решил учиться на веб-разработчика?'
          placeholder='Не более 300 символов'
          maxLength={300}
        />
        <Text>Поля, отмеченные звездочкой, обязательны для&nbsp;заполнения</Text>
        <Button size={"l"}>Сохранить</Button>
      </form>
    </section>
  );
};
