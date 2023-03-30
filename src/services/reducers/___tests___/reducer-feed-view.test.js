import {
    OPEN_FEED,
    CLOSE_FEED
} from "../../actions/feed-view";
import {feedReducer, feedInitState as initialState} from "../feed-view";

describe('Feed view - редьюсер и экшены', () => {
    test('Должно вернуться исходное состояние', () => {
        expect(feedReducer(undefined, {})).toEqual({...initialState});
    });
    test('Открытие окна заказа', () => {
        expect(feedReducer(undefined, {
            type: OPEN_FEED,
            number: 46856,
            view: "642590370905fd001b624e2f",
        })).toEqual({
            number: 46856,
            feedView: "642590370905fd001b624e2f",
        });
    });
    test('Закрытие окна заказа', () => {
        expect(feedReducer(undefined, {type: CLOSE_FEED})).toEqual({
            ...initialState
        });
    });
});