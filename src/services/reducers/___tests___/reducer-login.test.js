import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL} from "../../actions/login";
import {loginReducer, loginInitState as initialState} from "../login";


describe('Login - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(loginReducer(undefined, {})).toEqual(initialState);
    });
    test('Логин - отправка запроса', () => {
        expect(loginReducer(undefined, { type: LOGIN_REQUEST })).toEqual({
            ...initialState,
            isRequest: true
        });
    });

    test('Логин - успех', () => {
        expect(loginReducer(undefined, { type: LOGIN_SUCCESS })).toEqual({
            ...initialState,
            isRequest: false
        });
    });

    test('Логин - ошибка', () => {
        expect(loginReducer(undefined, { type: LOGIN_FAIL })).toEqual({
            isFail: true,
            isRequest: false,
        });
    });

});