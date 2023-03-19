import React, {FC, useEffect} from "react";
import style from "./pages.module.css";
import {FeedsList} from "../components/feed-list/feed-list";
import {OrdersList} from "../components/orders-list/orders-list";
import {useSelector, useDispatch} from "react-redux";
import {WS_CONNECTION_START, WS_GET_MESSAGE, WS_CONNECTION_END} from "../services/actions/ws-feed-actions";


export const FeedsPage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START});
        return () => {
            dispatch({type: WS_CONNECTION_END});
        }
    }, [])

    return (
            <section className={style.feeds__page}>
                <FeedsList/>
                <OrdersList/>
            </section>
    );
}

