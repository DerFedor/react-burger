import React, {FC, useRef, useState, MutableRefObject, RefObject} from "react";
import IngredientsStyle from "./burger-ingredients.module.css";
import {
    Tab,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../modal/modal";
import {IIngredientType} from "../../utils/types";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import {
    CLOSE_CARD,
    OPEN_CARD,
} from "../../services/actions/view";
import {useDrag} from "react-dnd";

interface IHeaderBurgerIngredients {
    children: string; // React.ReactNode;
}
export const HeaderBurgerIngredients: FC<IHeaderBurgerIngredients> = (props) => {
    return (
        <h2 className="mt-10 mb-5 text text_type_main-large">{props.children}</h2>
    );
};



interface ITabContainer {
    tab: string;
    sauces: () => void;
    buns: () => void;
    main: () => void;
}

const TabContainer: FC<ITabContainer> = (props) => {
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

interface IIngredientCard {
    props: IIngredientType;
}

const IngredientCard: FC<IIngredientCard> = ({ props }) => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const componentsData = useSelector((store) => store.construct);
    function getComponentsIdArray() {
        let arr: Array<string>  = [];
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
        () => ingredients.filter((item) => item === props._id).length,
        [ingredients, props]
    );

    const [{ opacity }, ref] = useDrag(() => ({
        type: "ingredient",
        item: props,
        collect: (monitor: any) => ({
            opacity: monitor.isDragging() ? 0.1 : 1,
        }),
    }));

    const handleOpen = () => {
        dispatch({
            type: OPEN_CARD,
            view: props,
        });
        setIsVisible(true);
        window.history.pushState({ path: `#/ingredients/${props._id}` }, '', `#/ingredients/${props._id}`)
    };

    const handleClose = () => {
        dispatch({
            type: CLOSE_CARD
        })
        setIsVisible(false);
        // navigate("/");
        window.history.pushState({ path: `#/` }, '', `#/`)
    };

    const modal = <Modal onClose={handleClose} header='Детали ингредиента'>
        <IngredientDetails />
    </Modal>;

    return (
        <>
            <li
                className={"mt-6 " + IngredientsStyle.ingredientCard}
                data-test="ingredientsList"
                onClick={handleOpen}
                ref={ref}
                style={{opacity}}
            >
                <img className="ml-4 mr-4 " src={props.image} alt={props.image}/>
                <div className={"mt-1 mb-1 " + IngredientsStyle.priceElement}>
                    <p className="text text_type_digits-default">
                        {props.price + " "}
                        <CurrencyIcon type="primary"/>
                    </p>
                </div>
                <h2
                    className={
                        "text text_type_main-default " + IngredientsStyle.name
                    }
                >
                    {props.name}
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

interface IIngredientsBlock {
    type: string;
    text: string;
    refElement: RefObject<HTMLLIElement>;
}

const BurgerItemIngredients: FC<IIngredientsBlock> = (data) => {
    const ingredients = useSelector((store:any) => store.burger.ingredients);
    const itemType = ingredients.filter((item) => item.type === data.type);
    return (
        <li className="mt-10" id={data.type} ref={data.refElement}>
            <h2 className="text text_type_main-medium">{data.text}</h2>
            <ul className={" pl-4 " + IngredientsStyle.ingredientsList} >
                {itemType.map((item) => (
                    <IngredientCard key={item._id} props={item}/>
                ))}
            </ul>
        </li>

    );
};



export const BurgerIngredients = () => {
    const buns = useRef<HTMLLIElement>(null);
    const sauces = useRef<HTMLLIElement>(null);
    const main = useRef<HTMLLIElement>(null);
    const [tab, setTab] = useState<"one"|"two"|"three">("one");

    const scroll = (item: MutableRefObject<HTMLElement | null | undefined>) => {
        if (item.current) item.current.scrollIntoView({ behavior: "smooth" });
    };

    const onScroll = (e: React.UIEvent<HTMLElement>): void => {
        let element = e.currentTarget;
        if (buns.current && sauces.current) {
            if (
                element.scrollTop > buns.current.scrollHeight &&
                element.scrollTop <
                sauces.current.scrollHeight + buns.current.scrollHeight
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
                onScroll={onScroll}
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


