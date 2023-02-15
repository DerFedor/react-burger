import React, { useEffect, useState, useRef } from "react";
import {
    EmailInput,
    PasswordInput,
    Button,
    Input,
    EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "../components/app-header/app-header";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "./pages.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../services/actions/logout";
import { getCookie } from "../utils/cookies";
import { userDataUpdate, tokenUpdate, userDataUpdateWithoutToken } from "../services/actions/user";
export const Profile = () => {
    const dispatch = useDispatch();
    const { email, userName, isAuthenticated, token } = useSelector((state) => state.user);
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [nameInput, setNameInput] = useState("");
    const inputRef = useRef(null);

    const location = useLocation();
    console.log("location:");
    console.log(location);

    // const onIconClick = () => {
    //     setTimeout(() => inputRef.current.focus(), 0);
    //     alert("Icon Click Callback");
    // };



    useEffect(() => {
        setEmailValue(email);
        setNameInput(userName);
    }, []);

    const logoutOnClick = () => {
        const refreshToken = getCookie('refreshToken')
        dispatch(getLogout(refreshToken))
    }

    const userSaveDataOnClick = () => {
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

    const cancelButtonOnClick = () => {
        setEmailValue(email);
        setNameInput(userName);
        setPasswordValue('')
    }

    return (
        <>
            <AppHeader />
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
                {/*<div className="authorization__box">*/}
                    {location.pathname === '/profile' && <form className="authorization__box" onSubmit={(e) => userSaveDataOnClick(e)}>
                        <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={(e) => setNameInput(e.target.value)}
                        value={nameInput}
                        name={"name"}
                        ref={inputRef}
                        errorText={"Ошибка"}
                        icon="EditIcon"
                        //onIconClick={onIconClick}
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
                            onClick={cancelButtonOnClick}>Отмена</Button>
                        <Button onClick={userSaveDataOnClick}>Сохранить</Button>
                    </div>
                   {/*</div>*/}
                    </form>}
            </section>
        </>
    );
};
