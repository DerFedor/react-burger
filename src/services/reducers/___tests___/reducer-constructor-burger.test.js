import {
    REMOVE_COMPONENT,
    ADD_COMPONENT,
    CHANGE_BUN,
        CLEAR_COMPONENTS,
} from "../../actions/constructor-burger";
// import {orderReducer, initialState as order_initialState} from "./order";
import {burgerConstructorReducer, constructorInitialState as initialState} from "../constructor-burger";
import {
    testBurgerConstructorBun,
    testBurgerConstructorIngredients, testBurgerConstructorIngredientsAfterAdding,
    testBurgerConstructorIngredientsAfterRemoval
} from "./test_data";


describe('Burger constructor - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual({
            bun: "",
            components: [],
        });
    });

    test('Добавление соуса или начинки в заказ', () => {
        expect(
            burgerConstructorReducer(
                {
                    ...initialState,
                    components: testBurgerConstructorIngredients,

                },
                {
                    type: ADD_COMPONENT,
                    id: "60d3b41abdacab0026a733ca",
                    key: "asdfasd",
                }
            )
        ).toEqual({
            ...initialState,
            components: testBurgerConstructorIngredientsAfterAdding
        });
    });

    test('Добавление булки в заказ', () => {
        expect(
            burgerConstructorReducer(undefined, {
                type: CHANGE_BUN,
                id: "60d3b41abdacab0026a733c7",

                // payload: testBurgerConstructorBun
            })
        ).toEqual({
            ...initialState,
            bun: testBurgerConstructorBun,
            components:[],
        });
    });

    test('Удаление ингредиента из заказа', () => {
        expect(
            burgerConstructorReducer(
                {
                    ...initialState,
                    components: testBurgerConstructorIngredients
                },
                {
                    type: REMOVE_COMPONENT,
                    key: 'random_value',
                    // key: 'be1037a9-a0d5-4cb4-86f9-22e85ae2be77'
                }
            )
        ).toEqual({
            ...initialState,
            components: testBurgerConstructorIngredientsAfterRemoval
        });
    });

    test('Очистка заказа', () => {
        expect(
            burgerConstructorReducer(
                {
                    ...initialState,
                    components: testBurgerConstructorIngredients,
                    bun: testBurgerConstructorBun
                },
                { type: CLEAR_COMPONENTS }
            )
        ).toEqual({
            ...initialState,
            components: [],
            bun: ""
        });
    });

});