import {shape, number, string} from "prop-types";

export const ingredientType = shape({
    __v: number.isRequired,
    _id: string.isRequired,
    calories: number.isRequired,
    carbohydrates: number.isRequired,
    fat: number.isRequired,
    image: string.isRequired,
    image_large: string.isRequired,
    image_mobile: string.isRequired,
    name: string.isRequired,
    price: number.isRequired,
    proteins: number.isRequired,
    type: string.isRequired,

    });