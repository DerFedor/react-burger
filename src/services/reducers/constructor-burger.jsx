import {
    REMOVE_COMPONENT,
    ADD_COMPONENT,
    CHANGE_BUN,
    SORT_COMPONENT,
    CLEAR_COMPONENTS,
} from "../actions/constructor-burger";

const constructorInitialState = {
    buns: "60d3b41abdacab0026a733c7",
    components: [],
};

export const burgerConstructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case ADD_COMPONENT: {
            return {
                ...state,
                components: [...state.components].concat({
                    id: action.id,
                    key: action.key,
                }),
            };
        }
        case CHANGE_BUN: {
            return {
                ...state,
                bun: action.id,
            };
        }
        case REMOVE_COMPONENT: {
            return {
                ...state,
                components: [...state.components].filter(
                    (item) => item.key !== action.key
                ),
            };
        }
        case SORT_COMPONENT: {
            return {
                ...state,
                components: action.components,
            };
        }
        case CLEAR_COMPONENTS: {
            return {
                components: {
                    bun: "60d3b41abdacab0026a733c7",
                    components: [],
                },
            };
        }
        default: {
            return state;
        }
    }
};