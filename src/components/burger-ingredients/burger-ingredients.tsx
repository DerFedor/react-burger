import React from "react";
import {IngredientDetails} from "../ingredient-details/ingredient-details"
import PropTypes from "prop-types";
import IngredientsStyle from "./burger-ingredients.module.css";
import {
    Tab,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";


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
                    props.sauses();
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
    const [isVisible, setIsVisible] = React.useState(false);

    const handleOpen = () => {
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const modal = <Modal onClose={handleClose} header='Детали ингредиента'>
        <IngredientDetails {...card}/>
    </Modal>;

    return (
        <>
        <li
            className={"mt-6 " + IngredientsStyle.ingredientCard}
            onClick={handleOpen}>
            <img className="ml-4 mr-4 " src={card.image} alt={card.image} />
            <div className={"mt-1 mb-1 " + IngredientsStyle.priceBox}>
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
            {/*<div*/}
            {/*    className={*/}
            {/*        "text text_type_digits-default " +*/}
            {/*        ((card.__v > 0 && IngredientsStyle.count) ||*/}
            {/*            IngredientsStyle.countZero)*/}
            {/*    }*/}
            {/*>*/}
            {/*    {card.__v}*/}
            {/*</div>*/}
        </li>
            {isVisible && modal}
        </>
    );
};

IngredientCard.propTypes = {
    card: PropTypes.object.isRequired,
};

const BurgerItemIngredients = (props) => {
    //React.useEffect(() => console.log(typeof props.refElement));

    let itemType = props.api.filter((item) => item.type === props.type);
    return (
        <li className="mt-10" id={props.type} ref={props.refElement}>
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
    refElement: PropTypes.object.isRequired,
};

export const BurgerIngredients = (props) => {
    const buns = React.useRef("bun");
    const sause = React.useRef("sause");
    const main = React.useRef("main");

    const scroll = (item) => {
        item.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <section className={IngredientsStyle.burgerIngredients}>
            <HeaderBurgerIngredients>Соберите бургер</HeaderBurgerIngredients>
            <TabContainer
                buns={() => scroll(buns)}
                sauses={() => scroll(sause)}
                main={() => scroll(main)}
            />
            <ul className={IngredientsStyle.box}>
                <BurgerItemIngredients
                    refElement={buns}
                    api={props.api}
                    key="bun"
                    type="bun"
                    text="Булки"/>
                <BurgerItemIngredients
                    refElement={sause}
                    api={props.api}
                    key="sauce"
                    type="sauce"
                    text="Соусы"/>
                <BurgerItemIngredients
                    refElement={main}
                    api={props.api}
                    key="main"
                    type="main"
                    text="Начинки"/>
            </ul>
        </section>
    );

}

BurgerIngredients.propTypes = {
    api: PropTypes.arrayOf(PropTypes.object).isRequired
};
