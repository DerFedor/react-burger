import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_END,
    } from "../../actions/ws-feed-actions";
import {wsReducer,initialState} from "../ws-reducer";

const messages =
    {
        orders: [
            {
                createdAt: new Date("2022-04-15T05:07:37.636Z"),
                ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c9"],
                name: "Флюоресцентный бессмертный бургер",
                number: 13672,
                status: "done",
                updatedAt: new Date("2022-04-15T05:07:37.636Z"),
                _id: "61473cbddab0f3001bb06df8",
                price: 2325,
                __v: 0
            }
        ],
        success: true,
        total: 3475,
        totalToday: 69,
    };
describe('Websocket - редьюсер и экшены', () => {

    test('Должно вернуться исходное состояние', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });
    test('Успешное подключение к сокету', () => {
        expect(wsReducer(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true
        });
    });
    test('Ошибка подключения к сокету', () => {
        expect(wsReducer(undefined, { type: WS_CONNECTION_ERROR })).toEqual({
            ...initialState,
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
        });
    });

    test('Подключение к сокету закрыто', () => {
        expect(wsReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual({
            ...initialState,
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
        });
    });

    test('Получено сообщение', () => {
        expect(
            wsReducer(undefined, {
                type: WS_GET_MESSAGE,
                payload: messages
            })
        ).toEqual({
            ...initialState,
            orders: messages.orders,
            total: messages.total,
            totalToday: messages.totalToday,
        });
    });
    test('Подключение к сокету закончено', () => {
        expect(wsReducer(undefined, { type: WS_CONNECTION_END })).toEqual({
            ...initialState,
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
        });
    });
});
