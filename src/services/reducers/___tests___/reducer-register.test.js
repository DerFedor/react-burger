import {REGISTRATION_FAIL, REGISTRATION_SUCCESS, REGISTRATION_REQUEST} from "../../actions/register";
import {registrationReducer, registrationInitState as initialState} from "../register";


describe('Register - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(registrationReducer(undefined, {})).toEqual(initialState);
    });
    test('Регистрация - отправка запроса', () => {
        expect(registrationReducer(undefined, { type: REGISTRATION_REQUEST })).toEqual({
            ...initialState,
            isRequest: true
        });
    });

    test('Регистрация - успех', () => {
        expect(registrationReducer(undefined, { type: REGISTRATION_SUCCESS })).toEqual({
            ...initialState,
            isRequest: false
        });
    });

    test('Регистрация - ошибка', () => {
        expect(registrationReducer(undefined, { type: REGISTRATION_FAIL })).toEqual({
            isFail: true,
            isRequest: false,
        });
    });

});
