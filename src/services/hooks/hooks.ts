import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import type {} from 'redux-thunk/extend-redux'
import {RootState, TAppActions} from "../types";
import {ThunkAction} from "redux-thunk";

export type AppActions = TAppActions;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActions
>

//fix Thunk typing https://github.com/reduxjs/redux-thunk/issues/333
export type AppDispatch<TReturnType = void> = (action: AppActions | AppThunk) => TReturnType;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;