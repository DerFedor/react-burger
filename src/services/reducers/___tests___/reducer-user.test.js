import {
    USER_SET_DATA,
    USER_LOGOUT,
    USER_UPDATE_SUCCESS,
    TOKEN_UPDATE_SUCCESS,
    TOKEN_UPDATE_REQUEST,
    TOKEN_UPDATE_FAIL,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    RESET_TOKEN,
} from "../../actions/user";
import {userReducer, userInitState as initialState} from "../user";


describe('User - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    test('Запрос информации о пользователе - отправка запроса', () => {
        expect(userReducer(undefined, { type: USER_UPDATE_REQUEST })).toEqual({
            ...initialState,
            isRequest: true,
        });
    });

    test('Запрос информации о пользователе - успех', () => {
        expect(
            userReducer(undefined, {
                type: USER_UPDATE_SUCCESS,
                    name: 'Иванов Иван Иванович',
                    email: 'ivan@ivan.ru'
            })
        ).toEqual({
            ...initialState,
            email: 'ivan@ivan.ru',
            userName: 'Иванов Иван Иванович',
            isAuthenticated: true,
            isRequest: false,
        });
    });

    test('Запрос информации о пользователе - ошибка', () => {
        expect(userReducer(undefined, { type: USER_UPDATE_FAIL })).toEqual({
            ...initialState,
            isRequest: false,
            isFail: true
        });
    });

    test('Обновление информации о пользователе - получение данных о пользователе', () => {
        expect(userReducer(undefined, {
            type: USER_SET_DATA,
            name: 'Иванов Иван Иванович',
            email: 'ivan@ivan.ru',
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        })).toEqual({
            ...initialState,
            userName: 'Иванов Иван Иванович',
            email: 'ivan@ivan.ru',
            isAuthenticated: true,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        });
    });
    test('Обновление информации о токене - отправка запроса', () => {
        expect(userReducer(undefined, { type: TOKEN_UPDATE_REQUEST })).toEqual({
            ...initialState,
            isRequest: true,
            token: null
        });
    });
    test('Обновление информации о токене - успех', () => {
        expect(userReducer(undefined, {
            type: TOKEN_UPDATE_SUCCESS,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        })).toEqual({
            ...initialState,
            isRequest: false,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        });
    });

    test('Обновление информации о токене - ошибка', () => {
        expect(userReducer(undefined, { type: TOKEN_UPDATE_FAIL })).toEqual({
            ...initialState,
            token: null,
            isRequest: false,
            isFail: true
        });
    });
    test('Удаление токина', () => {
        expect(userReducer(undefined, { type: RESET_TOKEN })).toEqual({
            ...initialState,
            token: null,
        });
    });
    test('Выход из учетной записи', () => {
        expect(userReducer(undefined, { type: USER_LOGOUT })).toEqual({
            ...initialState,
            userName: null,
            email: null,
            isAuthenticated: false,
            token: null
        });
    });
});
