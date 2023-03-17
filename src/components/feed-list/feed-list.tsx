import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useEffect, useState} from "react";
// import { Feed } from "../feed/feed";
import style from './feeds-list.module.css'
import {Feed} from "../feed/feed";
import {Link, Navigate, NavLink, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { OPEN_FEED } from "../../services/actions/feed-view";

export const FeedsList: FC = () => {
    const [data, setData] = useState([1, 2, 3, 4])
    const location = useLocation()
    const dispatch = useDispatch()

    const onClick = (item) => {
        dispatch({ type: OPEN_FEED, view: item })
        console.log(item)
    }

    const testFeed = {
        "success": true,
        "orders": [
            {
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                ],
                "_id": "345",
                "status": "done",
                "number": 0,
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            },
            {
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733ce",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                    "60d3b41abdacab0026a733d1",
                ],
                "_id": "346",
                "status": "done",
                "number": 0,
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            }
        ],
        "total": 1,
        "totalToday": 1
    }

    return (
        <section className="pl-2 pr-2">
            <h1 className="mt-10 mb-5 text text_type_main-large">
                Лента заказов
            </h1>
            <ul className={style.feeds__list}>
                {testFeed.orders.map(item =>
                    <NavLink key={item._id} className={style.link}
                          to={`/feed/${item._id}`}
                          state = {{ background: location } }
                          onClick={(e) => onClick(item._id)}>
                        <Feed key={item._id} feed={item} />
                    </NavLink>
                )}
            </ul>
        </section>)
}
