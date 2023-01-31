import React from "react";
import PropTypes from "prop-types";
import IngredientsStyle from "./burger-ingredients.module.css";
import {
    Tab,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import {ingredientType} from "../../utils/prop-types";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_CARD, CLOSE_CARD } from "../../services/actions/list-ingredients";


const HeaderBurgerIngredients = (props) => {
    return (
        <h2 className="mt-10 mb-5 text text_type_main-large">{props.children}</h2>
    );
};

HeaderBurgerIngredients.propTypes = {
    children: PropTypes.string.isRequired,
};

const TabContainer = (props) => {
    const [current, setCurrent] = React.useState("one");
    return (
        <div style={{ display: "flex" }}>
            <Tab
                value="one"
                active={current === "one"}
                onClick={() => {
                    setCurrent("one");
                    props.buns();
                }}
            >
                Булки
            </Tab>
            <Tab
                value="two"
                active={current === "two"}
                onClick={() => {
                    setCurrent("two");
                    props.sauces();
                }}
            >
                Соусы
            </Tab>
            <Tab
                value="three"
                active={current === "three"}
                onClick={() => {
                    setCurrent("three");
                    props.main();
                }}
            >
                Начинки
            </Tab>
        </div>
    );
};

const IngredientCard = ({ card }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = React.useState(false);

    const handleOpen = () => {
        dispatch({
            type: OPEN_CARD,
            view: card,
        });
        setIsVisible(true);
    };

    const handleClose = () => {
        dispatch({
            type: CLOSE_CARD
        })
        setIsVisible(false);
    };

    const modal = <Modal onClose={handleClose} header='Детали ингредиента'>
        <IngredientDetails/>
    </Modal>;

    return (
        <>
        <li
            className={"mt-6 " + IngredientsStyle.ingredientCard}
            onClick={handleOpen}>
            <img className="ml-4 mr-4 " src={card.image} alt={card.image} />
            <div className={"mt-1 mb-1 " + IngredientsStyle.priceElement}>
                <p className="text text_type_digits-default">
                    {card.price+" "}
                    <CurrencyIcon type="primary" />
                </p>

            </div>
            <h2
                className={
                    "text text_type_main-default " + IngredientsStyle.name
                }
            >
                {card.name}
            </h2>
        </li>
            {isVisible && modal}
        </>
    );
};

IngredientCard.propTypes = {
    card: ingredientType,
};

const BurgerItemIngredients = (data) => {
    const ingredients = useSelector((store) => store.burger.ingredients);
    const itemType = ingredients.filter((item) => item.type === data.type);
    return (
        <li className="mt-10" id={data.type} ref={data.refElement}>
            <h2 className="text text_type_main-medium">{data.text}</h2>
            <ul className={" pl-4 " + IngredientsStyle.ingredientsList}>
                {itemType.map((item) => (
                    <IngredientCard key={item._id} card={item} />
                ))}
            </ul>
        </li>

    );
};

// BurgerItemIngredients.propTypes = {
//     type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
//     text: PropTypes.string.isRequired,
//     api: PropTypes.arrayOf(ingredientType).isRequired,
//     refElement: PropTypes.object.isRequired,
// };

export const BurgerIngredients = () => {
    const buns = React.useRef("bun");
    const sauces = React.useRef("sauces");
    const main = React.useRef("main");

    const scroll = (item) => {
        item.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <section className={IngredientsStyle.burgerIngredients}>
            <HeaderBurgerIngredients>Соберите бургер</HeaderBurgerIngredients>
            <TabContainer
                buns={() => scroll(buns)}
                sauces={() => scroll(sauces)}
                main={() => scroll(main)}
            />
            <ul className={IngredientsStyle.box}>
                <BurgerItemIngredients
                    refElement={buns}
                    key="bun"
                    type="bun"
                    text="Булки"/>
                <BurgerItemIngredients
                    refElement={sauces}
                    key="sauce"
                    type="sauce"
                    text="Соусы"/>
                <BurgerItemIngredients
                    refElement={main}
                    key="main"
                    type="main"
                    text="Начинки"/>
            </ul>
        </section>
    );

}

// BurgerIngredients.propTypes = {
//     ingredients: PropTypes.arrayOf(ingredientType).isRequired
// };
