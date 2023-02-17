import React from "react";
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRegistration } from "../services/actions/register";

import style from "./pages.module.css";


export const Registration = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.user)

    const [emailValue, setEmailValue] = React.useState("");

    const [passwordValue, setPasswordValue] = React.useState("");

    const [nameInput, setNameInput] = React.useState("");
    const inputRef = React.useRef(null);


    const registerOnClick = (e) => {
        e.preventDefault()
        const registerData = {
            email: emailValue,
            password: passwordValue,
            name: nameInput
        }
        dispatch(getRegistration(registerData))
    }

    if (isAuthenticated) {
        return (
            <Navigate to='/' />
        )
    }
    return (
        <>
            <section className={style.i__box}>
                <form className={style.authorization__box} onSubmit={(e) => registerOnClick(e)}>
                    <h1 className="mb-6 text text_type_main-medium ">Регистрация</h1>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={(e) => setNameInput(e.target.value)}
                        value={nameInput}
                        name={"name"}
                        ref={inputRef}
                        errorText={"Ошибка"}
                    />
                    <EmailInput
                        onChange={(e) => setEmailValue(e.target.value)}
                        value={emailValue}
                        name={"email"}
                        extraClass="mb-4"
                    />
                    <PasswordInput
                        onChange={(e) => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={"password"}
                        //extraClass="mb-4"
                    />
                    <Button htmlType="submit"
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
                </form>
            </section>
        </>
    );
};