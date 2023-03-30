import {
    PASSWORD_FORGOT_REQUEST,
    PASSWORD_FORGOT_SUCCESS,
    PASSWORD_FORGOT_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
} from "../../actions/reset-password"
import {passwordResetReducer, passwordResetInitState as initialState} from "../reset-password";

describe('Reset-password - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(passwordResetReducer(undefined, {})).toEqual(initialState);
    });
    test('Запрос на восстановление пароля - отправка запроса', () => {
        expect(passwordResetReducer(undefined, {type: PASSWORD_FORGOT_REQUEST})).toEqual({
            ...initialState,
            forgotRequest: true,
        });
    });

    test('Запрос на восстановление пароля - успех', () => {
        expect(passwordResetReducer(undefined, {type: PASSWORD_FORGOT_SUCCESS})).toEqual({
            ...initialState,
            forgotRequest: false,
            forgotFail: false,
            forgotSuccess: true,
            resetSuccess: false,
        });
    });

    test('Запрос на восстановление пароля - ошибка', () => {
        expect(passwordResetReducer(undefined, {type: PASSWORD_FORGOT_FAIL})).toEqual({
            ...initialState,
            forgotRequest: false,
            forgotFail: true,
            forgotSuccess: false,
            resetSuccess: false,
        });
    });

    test('Установка нового пароля - отправка запроса', () => {
        expect(passwordResetReducer(undefined, {type: PASSWORD_RESET_REQUEST})).toEqual({
            ...initialState,
            resetRequest: true,
        });
    });

    test('Установка нового пароля - успех', () => {
        expect(passwordResetReducer(undefined, {type: PASSWORD_RESET_SUCCESS})).toEqual({
            ...initialState,
            resetSuccess: true,
            forgotSuccess: false,
            resetRequest: false,
            resetFail: false,
        });
    });

    test('Установка нового пароля - ошибка', () => {
        expect(passwordResetReducer(undefined, {type: PASSWORD_RESET_FAIL})).toEqual({
            ...initialState,
            resetRequest: false,
            resetFail: true,
            resetSuccess: false,
        });
    });
});