import React from "react";

import PropTypes from "prop-types";
import IngredientsStyle from "./burger-ingredients.module.css";
import {
    Tab,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const HeaderBurgerIngredients = (props) => {
    return (
        <h2 className="mt-10 mb-5 text text_type_main-large">{props.children}</h2>
    );
};

HeaderBurgerIngredients.propTypes = {
    children: PropTypes.string.isRequired,
};

const TabContainer = () => {
    const [current, setCurrent] = React.useState("one");
    return (
        <div style={{ display: "flex" }}>
            <a className={IngredientsStyle.link} href="#bun">
                <Tab value="one" active={current === "one"} onClick={setCurrent}>
                    Булки
                </Tab>
            </a>
            <a className={IngredientsStyle.link} href="#sauce">
                <Tab value="two" active={current === "two"} onClick={setCurrent}>
                    Соусы
                </Tab>
            </a>
            <a className={IngredientsStyle.link} href="#main">
                <Tab value="three" active={current === "three"} onClick={setCurrent}>
                    Начинки
                </Tab>
            </a>
        </div>
    );
};

const IngredientCard = ({ card }) => {
    return (
        <li className={"mt-6 " + IngredientsStyle.ingredientCard}>
            <img className="ml-4 mr-4 " src={card.image} alt={card.image} />
            <div className={"mt-1 mb-1 " + IngredientsStyle.priceElement}>
                <p className="text text_type_digits-default">{card.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <h2
                className={"text text_type_main-default " + IngredientsStyle.name}
            >
                {card.name}
            </h2>
            <div
                className={
                    "text text_type_digits-default " +
                    ((card.__v > 0 && IngredientsStyle.count) ||
                        IngredientsStyle.countNone)
                }
            >
                {card.__v}
            </div>
        </li>
    );
};

IngredientCard.propTypes = {
    card: PropTypes.object.isRequired,
};

const BurgerItemIngredients = (props) => {
    let itemType = props.api.filter((item) => item.type === props.type);
    return (
        <li className="mt-10" id={props.type}>
            <h2 className="text text_type_main-medium">{props.text}</h2>
            <ul className={" pl-4 " + IngredientsStyle.ingredientsList}>
                {itemType.map((item) => (
                    <IngredientCard key={item._id} card={item} />
                ))}
            </ul>
        </li>
    );
};

BurgerItemIngredients.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
    text: PropTypes.string.isRequired,
    api: PropTypes.object.isRequired,
};

export const BurgerIngredients = (props) => {
    return (
        <section className={IngredientsStyle.burgerIngredients}>
            <HeaderBurgerIngredients>Соберите бургер</HeaderBurgerIngredients>
            <TabContainer />
            <ul className={IngredientsStyle.box}>
                <BurgerItemIngredients api={props.api} key="bun" type="bun" text="Булки" />
                <BurgerItemIngredients api={props.api} key="sauce" type="sauce" text="Соусы" />
                <BurgerItemIngredients api={props.api} key="main" type="main" text="Начинки" />
            </ul>
        </section>
    );

}
