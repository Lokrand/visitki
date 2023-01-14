import React, { MouseEventHandler } from "react";
import { FC, useState, FormEventHandler } from "react";
import styles from "./Input.module.scss";

const Input: FC<{ label: string; inputName: string }> = ({ label, inputName }) => {
    const [focus, setFocus] = useState(false);
    const [hover, setHover] = useState(false);
    const [inputValue, setValue] = React.useState("");
    const [displayStyle, setDisplayStyle] = React.useState({ display: "none" });


    const handleInputChange: FormEventHandler<HTMLInputElement> = (e) => {
        const target = e.target as HTMLInputElement
        setValue(target.value);
        target.value.length
            ? setDisplayStyle({ display: "block" })
            : setDisplayStyle({ display: "none" });
    };

    const handleInputFocus = () => {
        setFocus(true);
    };

    const handleInputBlur = () => {
        setFocus(false);
    };

    const handleButtonClick = () => {
        setValue("");
        setDisplayStyle({ display: "none" });
    };

    const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
        if (e.type === "mouseleave" && !focus) {
            setHover(false)
        } else setHover(true);
    };


    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <input
                type='text'
                name={inputName}
                value={inputValue}
                className={`${styles.input} ${focus ? styles.input_status_active : styles.input_status_default}
                ${hover ? styles.input_status_active : styles.input_status_default}`}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onMouseEnter={handleInputHover}
                onMouseLeave={handleInputHover}
                onChange={handleInputChange}
            />
            <button className={styles.button} style={displayStyle} onClick={handleButtonClick}></button>
        </div>
    );
};

export default Input;