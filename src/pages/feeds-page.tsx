import React, {FC, useEffect} from "react";
import style from "./pages.module.css";
import {FeedsList} from "../components/feed-list/feed-list";
import {OrdersList} from "../components/orders-list/orders-list";
import {  useDispatch } from "../services/hooks/hooks";

import {WS_CONNECTION_START, WS_CONNECTION_END} from "../services/actions/ws-feed-actions";
import {WS_URL} from "../utils/base-url";


export const FeedsPage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `${WS_URL}/all`
        });
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

