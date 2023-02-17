import React, {useEffect, useState, useRef} from "react";
import {
    PasswordInput,
    Button,
    Input,
    } from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation} from "react-router-dom";
import style from "./pages.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getLogout} from "../services/actions/logout";
import {getCookie} from "../utils/cookies";
import {userDataUpdate, userDataUpdateWithoutToken} from "../services/actions/user";

export const Profile = () => {
    const dispatch = useDispatch();
    const {email, userName, token} = useSelector((state) => state.user);
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [nameInput, setNameInput] = useState("");
    const inputRef = useRef(null);

    const location = useLocation();
    console.log("location:");
    console.log(location);

    useEffect(() => {
        setEmailValue(email);
        setNameInput(userName);
    }, []);

    const logoutOnClick = () => {
        const refreshToken = getCookie('refreshToken')
        dispatch(getLogout(refreshToken))
    }

    const userSaveDataOnClick = (e) => {
        e.preventDefault()
        console.log("e", e)
        const userData = {
            email: emailValue,
            name: nameInput,
            password: passwordValue
        }
        console.log("userData:", userData, "!token", !token)

        if (!token) {
            const refreshToken = getCookie('refreshToken')
            dispatch(userDataUpdateWithoutToken(userData, refreshToken))

        } else {
            dispatch(userDataUpdate(userData, token))
        }
    }

    const cancelButtonOnClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log(e)
        setEmailValue(email);
        setNameInput(userName);
        setPasswordValue('')
    }

    return (
        <>
            <section className={style.profile}>
                <ul className={style.list}>
                    <li className={style.profile_box}>
                        <p className="text text_type_main-medium">Профиль</p>
                    </li>
                    <li className={style.profile_box}>
                        <p className={"text text_type_main-medium text_color_inactive"}>
                            История заказов
                        </p>
                    </li>
                    <li className={style.profile_box} onClick={logoutOnClick}>
                        <p className={"text text_type_main-medium text_color_inactive"}
                           onClick={logoutOnClick}
                        >
                            Выход
                        </p>
                    </li>
                </ul>
                <form className="authorization__box" onSubmit={(e) => userSaveDataOnClick(e)}>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={(e) => setNameInput(e.target.value)}
                        value={nameInput}
                        name={"name"}
                        ref={inputRef}
                        errorText={"Ошибка"}
                        icon="EditIcon"
                    />
                    <Input
                        type={"email"}
                        placeholder={"Логин"}
                        onChange={(e) => setEmailValue(e.target.value)}
                        value={emailValue}
                        name={"email"}
                        errorText={"Ошибка"}
                        icon="EditIcon"
                    />
                    <PasswordInput
                        onChange={(e) => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={"password"}
                        icon="EditIcon"
                        extraClass="mb-4"
                    />
                    <div className={style.button__box}>
                        <Button
                            htmlType="button" type="secondary"
                            size="medium"
                            onClick={(e) => cancelButtonOnClick(e)}
                        >
                            Отмена
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
};
