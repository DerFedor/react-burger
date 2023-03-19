import React, {FC, useEffect} from "react";
import style from "../pages.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getLogout} from "../../services/actions/logout";
import {getCookie} from "../../utils/cookies";
import {ProfileForm} from "./profile-form";
import {useNavigate, useLocation, NavLink} from "react-router-dom";
import { Feed } from "../../components/feed/feed";
import { OPEN_FEED } from "../../services/actions/feed-view";
import {WS_CONNECTION_START_ORDER, WS_CONNECTION_END} from "../../services/actions/ws-feed-actions";





export const Profile : FC = () => {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const navigate = useNavigate();
    const { orders } = useSelector((state:any) => state.websocket)

    useEffect(() => {
        if (location.pathname === '/profile/orders') {
            console.log('open page profile orders')
            dispatch({ type: WS_CONNECTION_START_ORDER });
            return () => {
                console.log('close page profile orders')
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
                {/*{location.pathname === '/profile/orders' && <OrdersList/>}*/}
                {location.pathname === '/profile/orders' && <ul className={style.feeds__list}>
                    {orders?.map(item =>
                        <NavLink key={item._id} className={style.link}
                        to={`/profile/orders/${item._id}`}
                        state={{ background: location } }
                        onClick={(e) => onClick(item._id)}>
                        <Feed key={item._id} feed={item} place='orders'/>
                        </NavLink>
                        )}
                </ul>}
            </section>
        </>
    );
};
