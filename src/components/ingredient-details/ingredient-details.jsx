import React from "react";
import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
import ingredientDetailsStyle from "./ingredient-details.module.css";
import { useSelector} from "react-redux";

const Structure = (props) => {
    return (
        <div className={ingredientDetailsStyle.structure__box}>
            <p className="text text_type_main-default text_color_inactive">
                {props.structure}
            </p>
            <span className="text text_type_digits-default text_color_inactive">{props.children}</span>
        </div>
    );
};

export const IngredientDetails = () => {
    const view = useSelector((store) => store.view.openCard);
    return (
        <div className={ingredientDetailsStyle.box}>
            <img className={ingredientDetailsStyle.image} src={view.image} alt={view.name}/>
            <h2 className={"text text_type_main-medium pt-4 " +
                ingredientDetailsStyle.header}>{view.name}</h2>
            <div className={'mt-8 pb-15 ' + ingredientDetailsStyle.structure}>
                <Structure structure="Калории,ккал">{view.calories}</Structure>
                <Structure structure="Белки, г">{view.proteins}</Structure>
                <Structure structure="Жиры, г">{view.fat}</Structure>
                <Structure structure="Углеводы, г">{view.carbohydrates}</Structure>
            </div>
        </div>
    );
};


Structure.propTypes = {
    structure: PropTypes.string.isRequired,
    children: PropTypes.number.isRequired
}

