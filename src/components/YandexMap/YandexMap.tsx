import { useYMaps } from "@pbe/react-yandex-maps";
import { useEffect, useRef } from "react";

import styles from "./YandexMap.module.scss";

import { useFetch } from "../../hook/useFetch";
import Mark from "../../icons/Mark/yandex-logo.svg";
import { getAllProfiles } from "../../utils/api";
import { TFullProfile } from "../../utils/types";

export const YandexMap = () => {
  const mapRef = useRef(null);
  const ymaps = useYMaps([
    "Map",
    "Placemark",
    "templateLayoutFactory",
    "control.ZoomControl",
    "control.GeolocationControl",
    "control.SearchControl",
  ]);
  const { url } = getAllProfiles();
  const { data } = useFetch(url);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 7,
      controls: ["zoomControl", "geolocationControl", "searchControl"],
    });
    const MyMarkContentLayoutClass = ymaps.templateLayoutFactory.createClass(
      `<div class={{properties.containerStyle}}>               
        <img  src={{properties.markImg}} alt="Метка"/>       
        <div class={{properties.userInfoStyle}}> 
          <div class={{properties.userHeaderStyle}}>
            <img  src={{properties.userImg}} alt="аватарка" style="max-width: 24px; min-height: 24px; border-radius: 50%;"/> 
            <p class={{properties.textStyle}}>              
              {{properties.username}}             
            </p>
          </div>
          <span class={{properties.userCityStyle}}>{{properties.userCity}}</span>   
        </div>
        </div>`,
    );

    data?.items.map((item: TFullProfile) => {
      const myPlacemarkWithContent = new ymaps.Placemark(
        item.profile.city.geocode,
        {
          markImg: Mark,
          containerStyle: styles.mark,
          textStyle: styles.text,
          userInfoStyle: styles.user,
          userImg: item.profile.photo,
          userAvatarStyle: styles.photo,
          username: item.profile.name,
          userHeaderStyle: styles.user__info,
          userCityStyle: styles.user__city,
          userCity: item.profile.city.name,
        },
        {
          iconLayout: MyMarkContentLayoutClass,

          iconImageOffset: [-24, -24],

          iconContentOffset: [15, 15],
        },
      );
      map.geoObjects.add(myPlacemarkWithContent);
    });
  }, [ymaps, data]);
  return data && <section className={styles.map} ref={mapRef}></section>;
};
