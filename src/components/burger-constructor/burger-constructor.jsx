import React from "react";
import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderDetails} from "../order-details/order-details"
import {Modal} from "../modal/modal";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {ingredientType} from "../../utils/prop-types";
import {
    ConstructorPriceContext,
} from "../../services/сonstructor-сontext";
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from "../../services/actions/list-ingredients";
import { ORDER_CLEAR } from "../../services/actions/list-ingredients";


const ItemConstructor = ({ingredient}) => {
    return (
        <li className={"pl-8 " + burgerConstructorStyle.card}>
            <div className={burgerConstructorStyle.drag}>
                <DragIcon type="primary"/>
            </div>
            <div className={burgerConstructorStyle.element}>
                <ConstructorElement
                    type={ingredient.type}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                />
            </div>
        </li>
    );
};


const ItemConstructorLocked = ({ingredient, position}) => {
    return (
        <li className="pl-8">
            <ConstructorElement
                isLocked={true}
                type={ingredient.type}
                text={ingredient.name + position}
                price={ingredient.price / 2}
                thumbnail={ingredient.image}

            />
        </li>
    );
};


const ConstructorBox = ({ ingredients }) => {
    const ingredientsData = useSelector(state => state.burger.ingredients)
    const {dispatch} = React.useContext(ConstructorPriceContext);


    const constructorData = ingredientsData.filter((item) =>
        ingredients.find((el) => el === item._id));

    const components = constructorData.filter((item) => item.type !== "bun");
    const buns = constructorData.filter((item) => item.type === "bun");

    React.useEffect(() => {
        dispatch({type: "set", arr: constructorData});
    }, [ingredientsData, ingredients]);

    return (
        <ul className={burgerConstructorStyle.box}>
            {buns.map((item) => (
                <ItemConstructorLocked
                    key={item._id}
                    ingredient={item}
                    position={" (верх)"}/>
            ))}
            <li>
                <ul className={burgerConstructorStyle.box_active}>
                    {components.map((item) => (
                        <ItemConstructor key={item._id} ingredient={item}/>
                    ))}
                </ul>
            </li>
            {buns.map((item) => (
                <ItemConstructorLocked
                    key={item._id}
                    ingredient={item}
                    position={" (низ)"}/>
            ))}

        </ul>


    );
};

const ConstructorBoxPrice = () => {
    const {state} = React.useContext(ConstructorPriceContext);

    return (
        <div className={"mr-10 " + burgerConstructorStyle.price}>
            <p className="text text_type_digits-medium">{state.price}</p>
            <CurrencyIcon type="primary"/>
        </div>
    );
};

const ConstructorButtonBox = ({ingredients}) => {
    const dispatch = useDispatch()
    const {order} = useSelector(store => store.burger)


    const handleClose = () => {
        dispatch({
            type: ORDER_CLEAR
        })
    };


    const modal =
        <Modal onClose={handleClose}>
            <OrderDetails/>
        </Modal>;

    return (
        <div className={"mr-4 mt-10 " + burgerConstructorStyle.button_order}>
                <ConstructorBoxPrice/>
                <Button
                        type="primary"
                        size="large"
                        onClick={async () => {
//                            await fetchOrder();
                            dispatch(getOrder(ingredients))
                        }}>
                    Оформить заказ
                </Button>
                {order && modal}
        </div>
    );
};
const priceInitialState = {price: 0};

function reducer(state, action) {
    switch (action.type) {
        case "set":
            let total = 0;
            action.arr.forEach(function (item) {
                total += item.price;
            });
            return {price: total};
        case "reset":
            return priceInitialState;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

export const BurgerConstructor = () => {
    const [state, dispatch] = React.useReducer(reducer, priceInitialState);
    const componentsData = useSelector(store => store.burger.components);

    const ingredients = React.useMemo(
        () => componentsData.components.concat(componentsData.buns),
        [componentsData]
    );

    return (
        <section className={"pt-25 " + burgerConstructorStyle.constructor}>
            <ConstructorPriceContext.Provider value={{state, dispatch}}>
                <ConstructorBox ingredients={ingredients}/>
                <ConstructorButtonBox ingredients={ingredients}/>
            </ConstructorPriceContext.Provider>
        </section>
    );
}

ItemConstructor.propTypes = {
    ingredient: ingredientType.isRequired,
};

ItemConstructorLocked.propTypes = {
    ingredient: ingredientType.isRequired,
    position: PropTypes.string.isRequired,
};

// ConstructorBoxPrice.propTypes = {
//     post: PropTypes.array.isRequired
// }

// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(ingredientType).isRequired
// }

// ConstructorBox.propTypes = {
//     ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

ConstructorButtonBox.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
};