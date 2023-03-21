import React, {FC, useEffect} from "react";
import style from "../pages.module.css";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import {getLogout} from "../../services/actions/logout";
import {getCookie} from "../../utils/cookies";
import {ProfileForm} from "./profile-form";
import {useNavigate, useLocation, NavLink} from "react-router-dom";
import { Feed } from "../../components/feed/feed";
import { OPEN_FEED } from "../../services/actions/feed-view";
import {
    WS_CONNECTION_START_ORDER,
    WS_CONNECTION_END,
    WS_CONNECTION_START
} from "../../services/actions/ws-feed-actions";




export const Profile : FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.websocket)


    useEffect(() => {
        if (location.pathname === '/profile/orders') {
            dispatch({ type: WS_CONNECTION_START_ORDER });
            return () => {
                // console.log('close page profile orders')
                dispatch({ type: WS_CONNECTION_END });
            }
        }
    }, [location.pathname])


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

    const onClick = (item) => {
        // console.log(item)
        dispatch({ type: OPEN_FEED, view: item._id, number: item.number })
    }

    return (
        <div>
            <section         className={
                location.pathname === "/profile"
                    ? style.profile
                    : style.profile__orders
            }>
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
                {location.pathname === '/profile/orders' && <ul className={style.feeds__list}>
                    {orders?.slice(0).reverse().map((item) =>
                        <NavLink key={item._id} className={style.link}
                        to={`/profile/orders/${item._id}`}
                        state={{ background: location } }
                        onClick={(e) => onClick(item)}>
                        <Feed key={item._id} feed={item} place='orders'/>
                        </NavLink>
                        )}
                </ul>}
            </section>
        </div>
    );
};
