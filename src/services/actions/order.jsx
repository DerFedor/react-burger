import {Burger_API} from "../../utils/burger-api";
import {checkResponse} from "../../utils/check-response";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "GET_ORDER_FAIL";
export const ORDER_CLEAR = "ORDER_CLEAR";

export function getOrder(ingredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        fetch(`${Burger_API}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ingredients: ingredients,
            }),
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        order: res.order.number,
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_FAIL,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_FAIL,
                });
            });
    };
}