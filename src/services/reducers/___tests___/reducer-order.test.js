import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    ORDER_CLEAR,
} from "../../actions/order";
import {orderInitialState as initialState, orderReducer} from "../order";

describe('Feeds List - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(orderReducer(undefined, {})).toEqual({...initialState});
    });

    test('Отправка заказа - отправка запроса', () => {
        expect(orderReducer(undefined, { type: GET_ORDER_REQUEST })).toEqual({
            ...initialState,
            orderRequest: true,

        });
    });
    test('Отправка заказа - успех', () => {
        expect(
            orderReducer(undefined, {
                type: GET_ORDER_SUCCESS,
                order: 25819,
                orderRequest: false,
                orderFail: false,
            })
        ).toEqual({
            ...initialState,
            order: 25819
        });
    });
    test('Отправка заказа - ошибка', () => {
        expect(orderReducer(undefined, { type: GET_ORDER_FAIL })).toEqual({
            ...initialState,
            orderFail: true,
        });
    });
    test('Отправка заказа - очистка', () => {
        expect(orderReducer(undefined, { type: ORDER_CLEAR })).toEqual({
            ...initialState,
        });
    });

});