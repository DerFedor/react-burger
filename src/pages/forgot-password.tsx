import React, {useEffect} from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, NavLink, useLocation, redirect} from "react-router-dom";
import style from "./pages.module.css";

import {useDispatch, useSelector} from "react-redux";
import {passwordForgot} from "../services/actions/reset-password";
import { ILocationState } from "../utils/types";


export const ForgotPassword = () => {
    const {isAuthenticated} = useSelector((state:any) => state.user);
    const [emailValue, setEmailValue] = React.useState("");
    const {forgotSuccess} = useSelector((state:any) => state.password)
    const dispatch = useDispatch<any>()
    const location = useLocation()

    useEffect(() => {
        console.log("forgotSuccess", forgotSuccess)
    }, [forgotSuccess])

    const forgotPasswordSubmit = (e) => {
        e.preventDefault()
        if (emailValue) {
            dispatch(passwordForgot(emailValue))
        }
    };

    if (!isAuthenticated && forgotSuccess) {
        console.log("location", location)
        return (
            <Navigate to="/reset-password" state={{from: location}} />

            // <Navigate to={{ state: { from: location }, pathname: "/reset-password" }}/>
            // <redirect to={{ pathname: '/reset-password', state: { from: location } }} />
        )

    }

    if (isAuthenticated) {
        return (
            <Navigate to="/profile"/>
        )
    }

    return (
        <>
            <section className={style.i__box}>
                <form className={style.authorization__box}
                      onSubmit={(e) => forgotPasswordSubmit(e)}>
                    <h1 className="mb-6 text text_type_main-medium ">
                        Восстановление пароля
                    </h1>
                    <Input
                        type="email"
                        onChange={(e) => setEmailValue(e.target.value)}
                        value={emailValue}
                        name={"email"}
                        placeholder="Укажите e-mail"
                    />
                    <Button
                        extraClass="mt-4 mb-20"
                        htmlType={"submit"}
                    >
                        Восстановить
                    </Button>
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
                </form>
            </section>
        </>
    );
};