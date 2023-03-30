import {
    GET_ORDERS_TEMPORARY,
    GET_ORDERS_TEMPORARY_REQUEST,
    GET_ORDERS_TEMPORARY_FAIL,
} from "../../actions/feeds-list";
import {ordersReducerTemporary, initStateTemp as initialState} from "../feeds-list";
import {testOrders} from "./test_data";


describe('Feeds List - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(ordersReducerTemporary(undefined, {})).toEqual({...initialState});
    });

    test('Запрос информации о существующих заказах - отправка запроса', () => {
        expect(ordersReducerTemporary(undefined, {type: GET_ORDERS_TEMPORARY_REQUEST})).toEqual({
            ...initialState,
            request: true,
        });
    });
    test('Запрос информации о существующих заказах - успех', () => {
        expect(
            ordersReducerTemporary(undefined, {
                type: GET_ORDERS_TEMPORARY,
                orders: testOrders,
                total: 46681,
                today: 166,

            })
        ).toEqual({
            ...initialState,
            orders: testOrders,
            total: 46681,
            totalToday: 166,
        });
    });
    test('Запрос информации о существующих заказах - ошибка', () => {
        expect(ordersReducerTemporary(undefined, {type: GET_ORDERS_TEMPORARY_FAIL})).toEqual({
            ...initialState
        });
    });
});