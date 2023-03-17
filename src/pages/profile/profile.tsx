import React, {FC} from "react";

import style from "../pages.module.css";
import {useDispatch} from "react-redux";
import {getLogout} from "../../services/actions/logout";
import {getCookie} from "../../utils/cookies";
import {ProfileForm} from "./profile-form";
import {useNavigate, useLocation} from "react-router-dom";
import {OrdersList} from "../orders-list";



export const Profile : FC = () => {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const navigate = useNavigate();
    const logoutOnClick = () => {
        const refreshToken = getCookie('refreshToken')
        dispatch(getLogout(refreshToken))
    }
    const ordersClick = () => {
            navigate("/profile/orders");
    }
    const profileClick = () => {
        navigate("/profile");
    }
    return (
        <>
            <section className={style.profile}>
                <ul className={style.list}>
                    <li className={style.profile_box} onClick={profileClick}>
                        <p className={"text text_type_main-medium " + (location.pathname === '/profile' ? '' : "text_color_inactive")}>Профиль</p>
                    </li>
                    <li className={style.profile_box} onClick={ordersClick}>
                        <p className={"text text_type_main-medium " + (location.pathname === '/profile' ? "text_color_inactive" : '')}>
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
                    <p className={style.info + ` text text_type_main-default`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </ul>
                {location.pathname === '/profile' && <ProfileForm/>}
                {location.pathname === '/profile/orders' && <OrdersList/>}
            </section>
        </>
    );
};
