import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import IngredientsStyle from "./burger-ingredients.module.css";
import {
    Tab,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../modal/modal";
import {ingredientType} from "../../utils/prop-types";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {
    CLOSE_CARD,
    OPEN_CARD,
} from "../../services/actions/view";
import {useDrag} from "react-dnd";


const HeaderBurgerIngredients = (props) => {
    return (
        <h2 className="mt-10 mb-5 text text_type_main-large">{props.children}</h2>
    );
};

HeaderBurgerIngredients.propTypes = {
    children: PropTypes.string.isRequired,
};

const TabContainer = (props) => {
    // const [current, setCurrent] = useState("one");
    return (
        <div className={IngredientsStyle.tab}>
            <Tab
                value="one"
                active={props.tab === "one"}
                onClick={() => {
                    props.buns();
                }}
            >
                Булки
            </Tab>
            <Tab
                value="two"
                active={props.tab === "two"}
                onClick={() => {
                    props.sauces();
                }}
            >
                Соусы
            </Tab>
            <Tab
                value="three"
                active={props.tab === "three"}
                onClick={() => {
                    props.main();
                }}
            >
                Начинки
            </Tab>
        </div>
    );
};

const IngredientCard = ({card}) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);

    const componentsData = useSelector((store) => store.burgerConstruct);
    function getComponentsIdArray() {
        let arr = [];
        if (componentsData.components.length > 0) {
            arr = componentsData.components.map((item) => item.id);
        }
        return arr;
    }
    const componentsIdArray = React.useMemo(
        () => getComponentsIdArray(),
        [componentsData]
    );


    const ingredients = React.useMemo(
        () => componentsIdArray.concat(componentsData.bun),
        [componentsData]
    );

    const counter = React.useMemo(
        () => ingredients.filter((item) => item === card._id).length,
        [ingredients, card]
    );

    const [{opacity}, ref] = useDrag({
        type: "ingredient",
        item: {card},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.1 : 1,
        }),
    });

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
        <IngredientDetails />
    </Modal>;

    return (
        <>
            <li
                className={"mt-6 " + IngredientsStyle.ingredientCard}
                onClick={handleOpen}
                ref={ref}
                style={{opacity}}
            >
                <img className="ml-4 mr-4 " src={card.image} alt={card.image}/>
                <div className={"mt-1 mb-1 " + IngredientsStyle.priceElement}>
                    <p className="text text_type_digits-default">
                        {card.price + " "}
                        <CurrencyIcon type="primary"/>
                    </p>
                </div>
                <h2
                    className={
                        "text text_type_main-default " + IngredientsStyle.name
                    }
                >
                    {card.name}
                </h2>
                <div
                    className={
                        "text text_type_digits-default " +
                        ((counter > 0 && IngredientsStyle.count) ||
                            IngredientsStyle.countNone)
                    }
                >
                    {counter}
                </div>
            </li>
            {isVisible && modal}
        </>
    );
};

IngredientCard.propTypes = {
    card: ingredientType.isRequired,
};

const BurgerItemIngredients = (data) => {
    const ingredients = useSelector((store) => store.burger.ingredients);
    const itemType = ingredients.filter((item) => item.type === data.type);
    return (
        <li className="mt-10" id={data.type} ref={data.refElement}>
            <h2 className="text text_type_main-medium">{data.text}</h2>
            <ul className={" pl-4 " + IngredientsStyle.ingredientsList}>
                {itemType.map((item) => (
                    <IngredientCard key={item._id} card={item}/>
                ))}
            </ul>
        </li>

    );
};

BurgerItemIngredients.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
    text: PropTypes.string.isRequired,
};

export const BurgerIngredients = () => {
    const buns = useRef("bun");
    const sauces = useRef("sauces");
    const main = useRef("main");
    const [tab, setTab] = useState("one");

    const scroll = (item) => {
        item.current.scrollIntoView({behavior: "smooth"});
    };

    const onScroll = (e) => {
        let element = e.target;
        if (
            element.scrollTop > buns.current.scrollHeight &&
            element.scrollTop < sauces.current.scrollHeight + buns.current.scrollHeight
        ) {
            setTab("two");
        }
        if (
            element.scrollTop >
            sauces.current.scrollHeight + buns.current.scrollHeight
        ) {
            setTab("three");
        }
        if (element.scrollTop <= buns.current.scrollHeight) {
            setTab("one");
        }
    };


    return (
        <section className={IngredientsStyle.burgerIngredients}>
            <HeaderBurgerIngredients>Соберите бургер</HeaderBurgerIngredients>
            <TabContainer
                buns={() => scroll(buns)}
                sauces={() => scroll(sauces)}
                main={() => scroll(main)}
                tab={tab}
            />
            <ul className={IngredientsStyle.box}
                onScroll={(e) => onScroll(e)}
            >
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

TabContainer.propTypes = {
    tab: PropTypes.string.isRequired,
    sauces: PropTypes.func.isRequired,
    buns: PropTypes.func.isRequired,
    main: PropTypes.func.isRequired,
};

