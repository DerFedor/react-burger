import React, { useEffect } from "react";
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../components/app-header/app-header";
import { Link } from "react-router-dom";
import style from "./pages.module.css";


export const Registration = () => {
    const [emailValue, setEmailValue] = React.useState("");
    const onChangeEmail = (e) => {
        setEmailValue(e.target.value);
    };
    const [passwordValue, setPasswordValue] = React.useState("");
    const onChangePassword = (e) => {
        setPasswordValue(e.target.value);
    };
    const [nameInput, setNameInput] = React.useState("");
    const inputRef = React.useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert("Icon Click Callback");
    };

    return (
        <>
            <AppHeader />
            <section className={style.i__box}>
                <div className={style.authorization__box}>
                    <h1 className="mb-6 text text_type_main-medium ">Регистрация</h1>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={(e) => setNameInput(e.target.value)}
                        value={nameInput}
                        name={"name"}
                        ref={inputRef}
                        errorText={"Ошибка"}
                        onIconClick={onIconClick}
                    ></Input>
                    <EmailInput
                        onChange={onChangeEmail}
                        value={emailValue}
                        name={"email"}
                        extraClass="mb-4"
                        // className="input_size_large"
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={passwordValue}
                        name={"password"}
                        //extraClass="mb-4"
                    />
                    <Button htmlType="button"
                            type="primary"
                            size="medium"
                            extraClass="mt-4 mb-20"
                    >
                        Зарегистрироваться</Button>
                    <nav>
                        <ul className={style.list}>
                            <li className="text text_type_main-default text_color_inactive mt-6">
                                Уже зарегистрированы?
                                <Link to="/login" className={style.link + " pl-3"}>
                                    Войти
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    );
};