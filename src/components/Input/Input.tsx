import React, { MouseEventHandler } from "react";
import { FC, useState, useRef, useCallback } from "react";
import InputStyles from "./Input.module.scss";

// interface Input {
//     label?: string
// }

const Input: FC<{ text: string; type: string }> = ({ text, type }) => {
    const [focus, setFocus] = useState(false);
    const ref = React.useRef<HTMLInputElement>(null);

    const onFocus = useCallback(() => {
        ref?.current?.focus();
    }, [ref]);

    const handleInputFocus = () => {
        onFocus();
        setFocus(true);
    };

    const handleInputBlur = () => {
        setFocus(false);
    };

    const handleInputHover: MouseEventHandler<HTMLInputElement> = (e) => {
        if (e.type === 'mouseenter') {
            setFocus(true);
        }
        else setFocus(false);
    };

    const border: string = focus ? "1px solid red" : "1px solid blue";


    return (
        <div className={InputStyles.container}>
            <label className={InputStyles.label}>
                {text}
            </label>
            <input
                type={type}
                className={`${InputStyles.input}`}
                style={{ border }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onMouseEnter={handleInputHover}
                onMouseLeave={handleInputHover}
          
            />
        </div>
    );
};

export default Input;
