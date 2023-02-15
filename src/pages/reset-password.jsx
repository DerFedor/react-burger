import React, { useEffect,useState } from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../components/app-header/app-header";
import {Link, useNavigate, useLocation, Navigate} from "react-router-dom";
import style from "./pages.module.css";
import {Burger_API} from "../utils/burger-url";
import {useSelector} from "react-redux";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const { state } = useLocation()
    const { isAuthenticated } = useSelector(state => state.user)

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
    const resetPasswordClick = () => {
        const sendPost = () => {
            fetch(`${Burger_API}/password-reset/reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: passwordValue,
                    token: codeInput,
                }),
            })
                .then(function (res) {
                    if (res.ok) {
                        return res.json();
                    }
                    //return Promise.reject(`Ошибка: ${res.statusText}`);
                    return Promise.reject(res);
                })
                .then((res) => {
                    if (res && res.success) {
                        navigate("/login");
                    }
                })
                .catch((res) => {
                    return res.json()
                }).then((res) => {
                console.log(res.message)
                alert(res.message)
            })
        };
        if (passwordValue && codeInput) {
            sendPost();
        }
    };

    if (isAuthenticated) {
        return (
            <Navigate to='/profile' />
        )
    }

    if (!isAuthenticated && state?.from.pathname !== '/forgot-password') {
        return (
            <Navigate to='/' />
        )
    }
    return (
        <>
            <AppHeader />
            <section className={style.i__box}>
                <div className={style.authorization__box}>
                    <h1 className="mb-6 text text_type_main-medium ">Восстановление пароля</h1>
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
                    />
                    <Button extraClass="mt-4 mb-20"
                            onClick={resetPasswordClick}
                    >Сохранить</Button>
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