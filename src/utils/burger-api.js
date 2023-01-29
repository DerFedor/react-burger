import React from "react";

const Burger_API = "https://norma.nomoreparties.space/api";


export function getIngredients()
{ return fetch(`${Burger_API}/ingredients`)
    .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.statusText}`);
        })

}




