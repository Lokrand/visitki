import React, { MouseEventHandler } from "react";
import { FC, useState, FormEventHandler } from "react";
import styles from "./InputSelect.module.scss";

const InputSelect: FC<{ label: string; inputName: string }> = ({ label, inputName }) => {
    const [focus, setFocus] = useState(false);
    const [hover, setHover] = useState(false);
    const [inputValue, setValue] = React.useState("");
    const [isActive, setActive] = useState(false);
    const options = ['серьезный', 'романтичный', 'дерзкий']
    const height = !isActive ? 0 : options.length >= 5 ? '192px' : `${options.length * 36}px`;

    // const handleInputChange: FormEventHandler<HTMLInputElement> = (e) => {
    //     const target = e.target as HTMLInputElement
    //     setValue(target.value);
    // };

    const handleInputFocus = () => {
        setFocus(true);
    };

    const handleInputBlur = () => {
        setFocus(false);
    };

    const handleButtonClick = () => {
        handleToggle()
        setValue("");
    };

    const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
        if (e.type === "mouseleave" && !focus) {
            setHover(false)
        } else setHover(true);
    };

    const handleToggle = () => {
        setActive(!isActive);
    };

    const handleOptionOnclick = (option: any) => {
        setActive(!isActive);
        setValue(option);
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
                // onChange={handleInputChange}
            />
            <button className={`${styles.button} ${!isActive ? styles.button_default : styles.button_active}`}
                onClick={handleButtonClick}></button>
            <div className={`${styles.wrapper} ${!isActive ? styles.wrapper_default : styles.wrapper_active}`}
                style={{ height: height }}>
                <ul className={styles.list}>
                    {options.map((option, index) => {
                        return (
                            <li className={styles.option}
                                key={index}
                                onClick={() => { handleOptionOnclick(option) }}
                            >{option}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default InputSelect;
