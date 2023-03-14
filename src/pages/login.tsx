import React from "react";
import {
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./pages.module.css";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getLogin} from "../services/actions/login";


export const LoginPage = () => {

    const {isAuthenticated} = useSelector((state:any) => state.user)

    const dispatch = useDispatch<any>()

    const [emailValue, setEmailValue] = React.useState("");

    const [passwordValue, setPasswordValue] = React.useState("");

    const loginOnClick = (e: React.FormEvent) => {
        e.preventDefault()
        const loginData = {
            email: emailValue,
            password: passwordValue
        }
        dispatch(getLogin(loginData))
    }

    if (isAuthenticated) {
        return (
            <Navigate to="/"/>
        )
    }
    return (
        <>
            <section className={style.i__box}>
                <form className={style.box} onSubmit={(e) => loginOnClick(e)}>
                    <h1 className={"mb-6 text text_type_main-medium"}>
                        Вход
                    </h1>
                    <EmailInput
                        value={emailValue}
                        name={"email"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value)}></EmailInput>
                    <PasswordInput
                        value={passwordValue}
                        name={"password"}
                        extraClass="mb-4"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordValue(e.target.value)}
                    />
                    <Button htmlType="submit"
                            type="primary"
                            size="medium"
                            extraClass="mb-20"
                    >
                        Войти</Button>

                    <nav>
                        <ul className={style.list}>
                            <li className="text text_type_main-default text_color_inactive">
                                Вы — новый пользователь?
                                <Link to="/register" className={style.link + " pl-3"}>
                                    Зарегистрироваться
                                </Link>
                            </li>
                            <li className="text text_type_main-default text_color_inactive">
                                Забыли пароль?
                                <Link to="/forgot-password" className={style.link + " pl-3"}>
                                    Восстановить пароль
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </form>
            </section>
        </>
    );
};