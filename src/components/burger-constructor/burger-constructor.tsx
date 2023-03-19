import React from "react";
import burgerConstructorStyle from "./burger-constructor.module.css";
import { useSelector} from 'react-redux';
import {ConstructorButtonPriceBox} from "./constructor-button-price-box";
import {ConstructorBox} from "./constructor-box";
import { Loader } from "../loader/loader";

export const BurgerConstructor = () => {
    const componentsData = useSelector((store:any) => store.burgerConstruct);
    const { orderRequest } = useSelector((store:any) => store.order);

    function getComponentsIdArray(): Array<string> {
        let arr: Array<string> = [];
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

    return (
        <section className={"pt-25 " + burgerConstructorStyle.constructor}>
            {orderRequest && <Loader text="Заказ создается" />}
            <ConstructorBox ingredients={ingredients}/>
            <ConstructorButtonPriceBox ingredients={ingredients}/>
        </section>
    );
}
