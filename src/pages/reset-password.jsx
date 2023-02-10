import React, { useEffect,useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import style from "./pages.module.css";

export const ResetPassword = () => {
    const [passwordValue, setPasswordValue] = useState("");
    const onChangePassword = (e) => {
        setPasswordValue(e.target.value);
    };
    const [codeInput, setCodeInput] = React.useState("");
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
                        type="password"
                        onChange={onChangePassword}
                        value={passwordValue}
                        name={"password"}
                        placeholder="Введите новый пароль"
                    />
                    <Input
                        type={"text"}
                        placeholder={"Введите код из письма"}
                        onChange={(e) => setCodeInput(e.target.value)}
                        value={codeInput}
                        name={"code"}
                        ref={inputRef}
                        errorText={"Ошибка"}
                        onIconClick={onIconClick}
                    ></Input>
                    <Button extraClass="mt-4 mb-20">Сохранить</Button>
                    <nav>
                        <ul className={style.list}>
                            <li className="text text_type_main-default text_color_inactive mt-6">
                                Вспомнили пароль?
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