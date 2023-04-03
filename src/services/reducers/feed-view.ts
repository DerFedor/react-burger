import { OPEN_FEED, CLOSE_FEED, TFeedView } from "../actions/feed-view";

type TFeedInitState = {
    feedView: string;
    number: number | null;
};

export const feedInitState: TFeedInitState = {
    feedView: "",
    number: null,
};

export const feedReducer = (state = feedInitState, action: TFeedView): TFeedInitState => {
    switch (action.type) {
        case OPEN_FEED: {
            // console.log("feedView",action.view);
            // console.log("number",action.number);
            return {
                feedView: action.view,
                number: action.number,
            };
        }
        case CLOSE_FEED: {
            return {
                feedView: "",
                number: null,
            };
        }
        default: {
            return state;
        }
    }
};