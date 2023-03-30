import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAIL,
} from "../../actions/burger-ingredients";
import {burgerReducer,initialState} from "../burger-ingredients";
import {testBurgerConstructorAllIngredients} from "./test_data";


describe('Burger ingredients - редьюсер и экшены', () => {
       test('Должно вернуться исходное состояние', () => {
        expect(burgerReducer(undefined, {})).toEqual({...initialState});
    });

    test('Запрос ингредиентов с сервера - отправка запроса', () => {
        expect(burgerReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
            ...initialState,
            ingredientsRequest: true,
    });
    });

    test('Запрос ингредиентов с сервера - успех', () => {
        expect(
            burgerReducer(undefined, {
                type: GET_INGREDIENTS_SUCCESS,
                items: testBurgerConstructorAllIngredients
            })
        ).toEqual({
            ingredients: testBurgerConstructorAllIngredients,
            ingredientsRequest: false,
            ingredientsFail: false,
        });
    });

    test('Запрос ингредиентов с сервера - ошибка', () => {
        expect(burgerReducer(undefined, { type: GET_INGREDIENTS_FAIL })).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFail: true,
        });
    });
});