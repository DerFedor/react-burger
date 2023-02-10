import React, {useEffect} from "react";
import {
    EmailInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {AppHeader} from "../components/app-header/app-header";
import {Link, useNavigate} from "react-router-dom";
import style from "./pages.module.css";

export const ForgotPassword = () => {
    const [emailValue, setEmailValue] = React.useState("");
    const onChangeEmail = (e) => {
        setEmailValue(e.target.value);
    };
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/reset-password");
    };

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
                    <Button onClick={onClick}
                            extraClass="mt-4 mb-20"
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