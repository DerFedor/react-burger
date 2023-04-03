import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL } from "../../actions/logout";
import {logoutReducer,loginInitState as initialState} from "../logout";


describe('Logout - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(logoutReducer(undefined, {})).toEqual(initialState);
    });
    test('Выход из системы  - отправка запроса', () => {
        expect(logoutReducer(undefined, { type: LOGOUT_REQUEST })).toEqual({
            ...initialState,
            isRequest: true
        });
    });

    test('Выход из системы  - успех', () => {
        expect(logoutReducer(undefined, { type: LOGOUT_SUCCESS })).toEqual({
            ...initialState,
            isRequest: false
        });
    });

    test('Выход из системы  - ошибка', () => {
        expect(logoutReducer(undefined, { type: LOGOUT_FAIL })).toEqual({
            isFail: true,
            isRequest: false,
        });
    });
});
