import { BASE_URL } from "../../utils/base-url";
import { USER_SET_DATA, RESET_TOKEN } from "./user";
import { setCookie } from "../../utils/cookies";
import { checkResponse } from "../../utils/check-response";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "LOGIN_SUCCESS";
export const REGISTRATION_FAIL = "LOGIN_FAIL";

export function getRegistration(data) {
    console.log('reg')
    return function (dispatch) {
        console.log('reg')
        dispatch({
            type: REGISTRATION_REQUEST,
        });
        fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: data.email,
                name: data.name,
                password: data.password
                }
            ),
        })
            .then(checkResponse)
            .then((res) => {
                // res.refreshToken = undefined;
                // res.accessToken = undefined;
                if (res && res.success) {
                    console.log("res:")
                    console.log(res)

                    dispatch({
                        type: REGISTRATION_SUCCESS,
                    });
                    dispatch({
                        type: USER_SET_DATA,
                        email: res.user.email,
                        name: res.user.name,
                        token: res.accessToken,
                    })
                    setTimeout(() => dispatch({ type: RESET_TOKEN }), [1000 * 1200])
                    const refreshToken = res.refreshToken
                    setCookie('refreshToken', refreshToken)
                } else {
                    dispatch({
                        type: REGISTRATION_FAIL,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: REGISTRATION_FAIL,
                });
            });
    };
}
