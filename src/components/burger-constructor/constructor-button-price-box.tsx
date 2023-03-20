import {useDispatch, useSelector} from "../../services/hooks/hooks" ;
import burgerConstructorStyle from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getOrder, ORDER_CLEAR} from "../../services/actions/order";
import {CLEAR_COMPONENTS} from "../../services/actions/constructor-burger";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import React, {FC, useMemo} from "react";

import {useNavigate} from "react-router-dom";

interface IConstructorBoxPrice {
    ingredients: Array<string>;
}


export const ConstructorBoxPrice: FC<IConstructorBoxPrice> = ({
                                                                  ingredients,
                                                              }) => {
    const ingredientsData = useSelector((state) => state.burger.ingredients);


    const price = useMemo(() => {
        let total = 0;
        ingredients.forEach((item) => {
            const ingredient = ingredientsData.find((el) => el._id === item);
            if (ingredient) {
                total += ingredient.price;
            }
        });
        return total;
    }, [ingredients, ingredientsData]);

    return (
        <div className={"mr-10 " + burgerConstructorStyle.price}>
            <p className="text text_type_digits-medium">{price}</p>
            <CurrencyIcon type="primary"/>
        </div>
    );
};

interface IConstructorButtonPriceBox {
    ingredients: Array<string>;
}

export const ConstructorButtonPriceBox: FC<IConstructorButtonPriceBox> = ({ingredients}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {order} = useSelector((store) => store.order)
    const {isAuthenticated, token} = useSelector((state) => state.user)
    const buttonState = useSelector((store) => store.order.orderRequest)

    const handleClose = () => {
        dispatch({
            type: ORDER_CLEAR
        });
        dispatch({
            type: CLEAR_COMPONENTS,
        });
    };


    const modal =
        <Modal onClose={handleClose} >
            <OrderDetails/>
        </Modal>;

    return (
        <div className={"mr-4 mt-10 " + burgerConstructorStyle.button_order}>
            <ConstructorBoxPrice ingredients={ingredients}/>
            <Button
                disabled={buttonState}
                htmlType="button"
                type="primary"
                size="large"
                onClick={() => {
                    if (!isAuthenticated) {
                        navigate("/login");
                    } else {
                        dispatch(getOrder(ingredients, token));
                    }
                }}
            >
                Оформить заказ
            </Button>
            {order && modal}
        </div>
    );
};

