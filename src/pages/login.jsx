import React, { useEffect } from "react";
import {
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import style from "./pages.module.css";
import { AppHeader } from "../components/app-header/app-header";


export const LoginPage = () => {
    const [emailValue, setEmailValue] = React.useState("bob@example.com");
    // const onChangeEmail = (e) => {
    //     setEmailValue(e.target.value);
    // };
    const [passwordValue, setPasswordValue] = React.useState("password");
    const onChangePassword = (e) => {
        setPasswordValue(e.target.value);
    };
    const Email =() => {
        const [value, setValue] = React.useState('bob@example.com')
        const onChangeEmail = e => {
            setValue(e.target.value)
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/*<EmailInput*/}
                {/*    onChange={onChange}*/}
                {/*    value={value}*/}
                {/*    name={'email'}*/}
                {/*    placeholder="Логин"*/}
                {/*    isIcon={true}*/}
                {/*    extraClass="mb-2"*/}
                {/*/>*/}
                <EmailInput
                    onChange={onChangeEmail}
                    value={value}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-4 mt-4"
                />
            </div>
        )
    };

    return (
        <>
            <AppHeader />
            <section className={style.i__box}>
                <div className={style.box}>
                    <h1 className={"text text_type_main-medium"}>
                        Вход
                    </h1>
                    <Email/>
                    <PasswordInput
                        onChange={onChangePassword}
                        value={passwordValue}
                        name={"password"}
                        extraClass="mb-4"
                    />
                    <Button htmlType="button"
                            type="primary"
                            size="medium"
                            extraClass="mb-20"
                    >
                        Войти</Button>
                    {/*<div className={style.text+"mt-20" }>*/}
                    {/*    <p className="text text_type_main-default">*/}
                    {/*        Вы - новый пользователь?*/}
                    {/*    </p>*/}
                    {/*    <Link className={style.link + "text text_type_main-default"} to="/">*/}
                    {/*        Зарегистрироваться*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    {/*<div className="mt-4 text">*/}
                    {/*    <p className="text text_type_main-default">Забыли пароль?</p>*/}
                    {/*    <Link className={style.link +"text text_type_main-default"} to="/">*/}
                    {/*        Восстановить пароль*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
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

                </div>
            </section>
        </>
    );
};