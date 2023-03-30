import { CLOSE_CARD, OPEN_CARD } from "../../actions/view";
import {viewReducer, viewInitialState as initialState} from "../view";
import {testCartIngredient} from "./test_data";

describe('View карточка ингридиента - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(viewReducer(undefined, {})).toEqual({...initialState});
    });
    test('Открытие карточки ингридиента', () => {
        expect(viewReducer(undefined, {
            type: OPEN_CARD,
            view: testCartIngredient,
        })).toEqual({
            openCard: testCartIngredient,
        });
    });
    test('Закрытие карточки ингридиента', () => {
        expect(viewReducer(undefined, {type: CLOSE_CARD})).toEqual({
            ...initialState
        });
    });

});
