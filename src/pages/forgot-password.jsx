import React, {useEffect} from "react";
import {
    EmailInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {AppHeader} from "../components/app-header/app-header";
import {Link, useNavigate, redirect, useLocation} from "react-router-dom";
import style from "./pages.module.css";
import {Burger_API} from "../utils/burger-url";
import { useSelector } from "react-redux";

export const ForgotPassword = () => {
    const { isAuthenticated } = useSelector(state => state.user);
    const [emailValue, setEmailValue] = React.useState("");
    const onChangeEmail = (e) => {
        setEmailValue(e.target.value);
    };
    const navigate = useNavigate();
    // const location = useLocation();
    // console.log("location:");
    // console.log(location);


    // const onClick = () => {
    //     navigate("/reset-password");
    // };

    const forgotPasswordClick = () => {
        const sendPost = () => {
            fetch(`${Burger_API}/password-reset`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: emailValue,
                }),
            })
                .then(function (res) {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.statusText}`);
                })
                .then((res) => {
                    if (res && res.success) {
                        navigate("/reset-password");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (emailValue) {
            sendPost();
        }
    };

    if (isAuthenticated) {
        return (
            <redirect to='/profile' />
        )
    }
    return (
        <>
            <AppHeader/>
            <section className={style.i__box}>
                <div className={style.authorization__box}>
                    <h1 className="mb-6 text text_type_main-medium ">
                        Восстановление пароля
                    </h1>
                    <Input
                        type="email"
                        onChange={onChangeEmail}
                        value={emailValue}
                        name={"email"}
                        placeholder="Укажите e-mail"
                    />
                    <Button onClick={forgotPasswordClick}
                            extraClass="mt-4 mb-20"
                            htmlType={"submit"}
                    >Восстановить</Button>
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