import React, {FC} from "react";
import style from './feeds-list.module.css'
import {Feed} from "../feed/feed";
import { NavLink, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { OPEN_FEED } from "../../services/actions/feed-view";

export const FeedsList: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch()

    const onClick = (item) => {
        dispatch({ type: OPEN_FEED, view: item._id, number: item.number })
        // console.log(item)
    }
    const { orders } = useSelector((state) => state.websocket)

    return (
        <section className="pl-2 pr-2">
            <h1 className="mt-10 mb-5 text text_type_main-large">
                Лента заказов
            </h1>
            <ul className={style.feeds__list}>
                {orders?.map(item =>
                    <NavLink key={item._id} className={style.link}
                          to={`/feed/${item._id}`}
                          state = {{ background: location } }
                          onClick={(e) => onClick(item)}>
                        <Feed key={item._id} feed={item} place=''/>
                    </NavLink>
                )}
            </ul>
        </section>)
}
