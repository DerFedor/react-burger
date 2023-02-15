import React, { useEffect } from "react";
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../components/app-header/app-header";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { REGISTRATION_REQUEST } from "../services/actions/register";
import { getRegistration } from "../services/actions/register";

import style from "./pages.module.css";


export const Registration = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
//    const { isRequest, isFail } = useSelector(state => state.register)
    const { isAuthenticated } = useSelector(state => state.user)

    // useEffect(() => {
    //
    //     console.log(isAuthenticated)
    //     isAuthenticated ? navigate("/") : console.log(isAuthenticated)
    // }, [isAuthenticated])

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
    // const onIconClick = () => {
    //     setTimeout(() => inputRef.current.focus(), 0);
    //     alert("Icon Click Callback");
    // };

    const registerOnClick = () => {
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
                        //onIconClick={onIconClick}
                    />
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
                            onClick={registerOnClick}
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