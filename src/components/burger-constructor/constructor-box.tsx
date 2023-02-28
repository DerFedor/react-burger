import burgerConstructorStyle from "./burger-constructor.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_COMPONENT, CHANGE_BUN} from "../../services/actions/constructor-burger";
import {v4 as uuidv4} from "uuid";
import {ConstructorItem, ConstructorLockedItem} from "./item-constructor";
import {FC} from "react";
import { IIngredientType } from "../../utils/types";

interface IPlug {
    type: string;
}
const Plug: FC<IPlug> = ({ type }) => {
    return (
        <li className={"pl-8 "  + burgerConstructorStyle.card}>
            <div className={"text text_type_main-default"}>

                {type === 'top' &&
                    <p className={burgerConstructorStyle.top + ' ' + burgerConstructorStyle.plug}>
                        Выберите булки (вверх)
                    </p>}

                {type === 'main' &&
                    <p className={burgerConstructorStyle.main + ' ' + burgerConstructorStyle.plug}>
                        Выберите начинку
                    </p>
                }

                {type === 'bottom' &&
                    <p className={burgerConstructorStyle.bottom+ ' ' + burgerConstructorStyle.plug}>
                        Выберите булки (низ)
                    </p>}
            </div>
        </li>
    );
};

interface IConstructorBox {
    ingredients: Array<string>;
}
export const ConstructorBox: FC<IConstructorBox> = ({ ingredients }) => {
    const dispatch = useDispatch();
    const [, dropTarget] = useDrop(() => ({
        accept: "ingredient",
        drop: (card: IIngredientType) => {
            if (card.type === "bun") {
                dispatch({type: CHANGE_BUN, id: card._id});
            } else {
                let key = uuidv4();
                dispatch({type: ADD_COMPONENT, id: card._id, key: key});
            }
        },
    }));

    const ingredientsData = useSelector((state:any) => state.burger.ingredients)
    const components = useSelector((store:any) => store.burgerConstruct);


    return (
        <ul
            className={burgerConstructorStyle.box}
            ref={dropTarget}
        >
            {components.bun ? ingredientsData.map(
                (item) =>
                    item._id === components.bun && (
                        <ConstructorLockedItem
                            key={item._id}
                            ingredient={item}
                            type={"top"}
                            position={" (верх)"}/>
                    )
            ) : (<Plug type='top'/>
            )}
            <li>
                <ul className={burgerConstructorStyle.box_active}>
                    {ingredients.length === 1 ? (
                        <Plug type='main'/>
                    ) : (
                        components.components.map(({id, key}, index) => {
                            const ingredient = ingredientsData.find(
                                (el) => el._id === id && el.type !== "bun"
                            );
                            return (
                                ingredient && (
                                    <ConstructorItem
                                        key={key}
                                        ingredient={ingredient}
                                        index={index}
                                        itemKey={key}
                                    />
                                )
                            );
                        })
                    )}
                </ul>
            </li>
            {components.bun ? ingredientsData.map(
                (item) =>
                    item._id === components.bun && (
                        <ConstructorLockedItem
                            key={item._id}
                            ingredient={item}
                            position={" (низ)"}
                            type={"bottom"}/>
                    )
            ) : (<Plug type='bottom'/>
            )}

        </ul>


    );
};