import React, {useState} from "react";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import style from "./pages.module.css";
import {useDispatch, useSelector} from "react-redux";
import {passwordReset} from "../services/actions/reset-password";

export const ResetPassword = () => {
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector(state => state.user)
    const {resetSuccess} = useSelector(state => state.password)

    const [passwordValue, setPasswordValue] = useState("");

    const [codeInput, setCodeInput] = React.useState("");
    const inputRef = React.useRef(null);

    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        if (passwordValue && codeInput) {
            const data = {
                password: passwordValue,
                code: codeInput
            }
            dispatch(passwordReset(data))
        }
    };

    if (isAuthenticated) {
        return (
            <Navigate to='/profile'/>
        )
    }
    if (resetSuccess && !isAuthenticated) {
        return (
            <Navigate to='/login'/>
        )
    }

    return (
        <>
            <section className={style.i__box}>
                <form className={style.authorization__box}
                      onSubmit={(e) => resetPasswordSubmit(e)}>
                    <h1 className="mb-6 text text_type_main-medium ">Восстановление пароля</h1>
                    <Input
                        type="password"
                        onChange={(e) => setPasswordValue(e.target.value)}
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
                        //onIconClick={onIconClick}
                    />
                    <Button
                        extraClass="mt-4 mb-20"
                        htmlType={"submit"}
                    >
                        Сохранить
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