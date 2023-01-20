import { Dispatch, FC, MouseEventHandler, SetStateAction, useEffect, useMemo, useState } from "react";

import { YMaps, withYMaps } from "react-yandex-maps";

import styles from "../../components/InputSuggestView/InputSuggestView.module.scss";

import { Arrow } from "../../icons/Arrow/Arrow";

interface IInputSuggestView {
  setValue?: any;
  form?: any;
  error: string;
  isErrorCity?: boolean;
  setIsErrorCity?: Dispatch<SetStateAction<boolean>>;
}

export const InputSuggestView: FC<IInputSuggestView> = ({ setValue, form, isErrorCity, setIsErrorCity, error }) => {
  function MapSuggestComponent(props: any) {
    const { ymaps } = props;
    const [focus, setFocus] = useState(false);
    const [hover, setHover] = useState(false);
    const [isActive, setActive] = useState(false);
    const handleInputFocus = () => {
      setFocus(true);
    };
    const handleInputBlur = () => {
      setFocus(false);
    };
    const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
      if (e.type === "mouseleave" && !focus) {
        setHover(false);
      } else setHover(true);
    };

    useEffect(() => {
      ymaps.ready(function () {
        const suggestView = new ymaps.SuggestView("suggest", {
          results: 5,
          offset: [0, 0],
        });

        suggestView.events.add("select", function (e: any) {
          const coords: number[] = [];
          ymaps.geocode(e.get("item").value).then((res: any) => {
            const obj = res.geoObjects.get(0);
            coords.push(obj.geometry.getCoordinates());
          });
          //console.log(form.city);
          setValue({ ...form, city: { name: e.get("item").value, geocode: coords } });
          setIsErrorCity?.(false);
          setActive(false);
        });
      });
    }, [ymaps]);

    return (
      <div className={styles.container}>
        <label className={styles.label}>Выберите город *</label>
        <input
          id='suggest'
          type='text'
          name='city'
          placeholder={focus ? "" : form.city.name}
          className={`${styles.input} 
          ${hover ? styles.input_status_active : styles.input_status_default}`}
          onFocus={() => {
            setIsErrorCity?.(true);
            handleInputFocus();
          }}
          onBlur={handleInputBlur}
          onMouseEnter={handleInputHover}
          onMouseLeave={handleInputHover}
          onChange={() => {
            setActive(true);
          }}
        />
        <span className={`${styles.button} ${!isActive ? styles.button_default : styles.button_active}`}>
          <Arrow />
        </span>
        <span className={`${!isErrorCity ? styles.error : styles.error_active}`}>{error}</span>
      </div>
    );
  }
  const SuggestComponent = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, ["SuggestView", "geocode", "coordSystem.geo"]);
  }, [form, isErrorCity]);

  return (
    <div>
      <YMaps enterprise query={{ apikey: "d86907af-b5ca-40ff-95ca-1fe075313c17" }}>
        <SuggestComponent setValue={setValue} form={form} isErrorCity={isErrorCity} setIsErrorCity={setIsErrorCity} />
      </YMaps>
    </div>
  );
};

export default InputSuggestView;
