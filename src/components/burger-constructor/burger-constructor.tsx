import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import burgerConstructorStyle from "./burger-constructor.module.css";

const ItemConstructor = ({ props }) => {
  return (
      <li className={"pl-8 " + burgerConstructorStyle.card}>
        <div className={burgerConstructorStyle.drag}>
          <DragIcon type="primary" />
        </div>
        <div className={burgerConstructorStyle.element}>
          <ConstructorElement
              type={props.type}
              text={props.name}
              price={props.price}
              thumbnail={props.image}
          ></ConstructorElement>
        </div>
      </li>
  );
};



const ItemConstructorLocked = (props) => {
  return (
      <li className="pl-8">
        <ConstructorElement
            type={props.type}
            isLocked={true}
            text={props.text}
            price={props.price}
            thumbnail={props.thumbnail}
        ></ConstructorElement>
      </li>
  );
};



const ConstructorBox = () => {
  let ingredients = data.filter(item => item.type !== "bun")
  return (
      <ul className={burgerConstructorStyle.box}>
        <ItemConstructorLocked
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <li>
          <ul className={burgerConstructorStyle.box_scroll}>
            {ingredients.map((item) => (
                <ItemConstructor key={item._id} props={item} />
            ))}
          </ul>
        </li>
        <ItemConstructorLocked
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </ul>
  );
};

const ConstructorBoxPrice = (props) => {
  return (
      <div className={"mr-10 " + burgerConstructorStyle.price}>
        <p className="text text_type_digits-medium">{props.children}</p>
          <CurrencyIcon type="primary" />
      </div>
  );
};

const ConstructorButtonBox = () => {
  return (
      <div className={"mr-4 mt-10 " + burgerConstructorStyle.button_order}>
        <ConstructorBoxPrice>610</ConstructorBoxPrice>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
  );
};

export const BurgerConstructor = () => {
    return (
        <section className={"pt-25 " + burgerConstructorStyle.constructor}>
            <ConstructorBox />
            <ConstructorButtonBox />
        </section>
    );
}

ItemConstructor.propTypes = {
    props: PropTypes.object,
};

ItemConstructorLocked.propTypes = {
    type: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
};
