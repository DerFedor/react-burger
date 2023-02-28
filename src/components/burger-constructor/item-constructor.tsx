import {useDispatch, useSelector} from "react-redux";
import update from "immutability-helper";
import {REMOVE_COMPONENT, SORT_COMPONENT} from "../../services/actions/constructor-burger";
import {useDrag, useDrop} from "react-dnd";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useRef} from "react";
import {IIngredientType} from "../../utils/types";
import type { Identifier } from "dnd-core";


interface IConstructorItem {
    ingredient: IIngredientType;
    index: number;
    itemKey: string;
}
interface IConstructorItemMove {
    ingredient: IIngredientType;
    index: number;
    type?: string;
}

export const ConstructorItem: FC<IConstructorItem> = ({
                                                          ingredient,
                                                          index,
                                                          itemKey,
                                                      }) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);
    const componentsData = useSelector((store:any) => store.burgerConstruct);


    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const components = componentsData.components;
        const newComp = components.slice();

        const spliced = update(newComp, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, newComp[dragIndex]],
            ],
        });
        dispatch({
            type: SORT_COMPONENT,
            components: spliced,
        });
    };

    const [{opacity}, dragRef] = useDrag({
        type: "component",
        item: () => {
            return {ingredient, index};
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    const [{ handlerId }, dropRef] = useDrop<
        IConstructorItemMove,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "component",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: IConstructorItemMove, monitor: any) {
            if (!ref.current) {
                return;
            }
            // console.log(index);
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        drop(item:IConstructorItemMove) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
        },
    });

    dragRef(dropRef(ref));

    const deleteCard = () => {
        dispatch({type: REMOVE_COMPONENT, key: itemKey});
    };


    return (
        <li className={"pl-8 " + burgerConstructorStyle.card} ref={ref} data-handler-id={handlerId}>
            <div className={burgerConstructorStyle.drag}>
                <DragIcon type="primary"/>
            </div>
            <div className={burgerConstructorStyle.element} style={{opacity}}>
                <ConstructorElement
                    //type={ingredient.type}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => deleteCard()}
                />
            </div>
        </li>
    );
};


interface IConstructorLockedItem {
    ingredient: IIngredientType;
    position: string;
    type: "top" | "bottom" | undefined;
}

export const ConstructorLockedItem: FC<IConstructorLockedItem> = ({
                                                               ingredient,
                                                               position,
                                                               type,
                                                           }) => {
    console.log(type);
    // console.log(ingredient.name);
    // console.log(ingredient.type);
    return (
        <li className="pl-8">
            <ConstructorElement
                isLocked={true}
                type={type}
                text={ingredient.name + position}
                price={ingredient.price / 2}
                thumbnail={ingredient.image}

            />
        </li>
    );

};

