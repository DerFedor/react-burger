import React from "react";
 import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
import ingredientDetailsStyle from "./ingredient-details.module.css";


const Structure = (props) => {
  return (
    <div className={ingredientDetailsStyle.structure__box} >
      <p className="text text_type_main-default text_color_inactive">
          {props.structure}
      </p>
      <span className="text text_type_digits-default text_color_inactive">{props.children}</span>
    </div>
  );
};

export const IngredientDetails = (props) => {
  return (
    <div className={ingredientDetailsStyle.box}>
      <img className={ingredientDetailsStyle.image} src={props.image} alt={props.name}/>
      <h2 className={"text text_type_main-medium pt-4 " +
          ingredientDetailsStyle.header}>{props.name}</h2>
      <div className={'mt-8 pb-15 ' + ingredientDetailsStyle.structure}>
        <Structure structure="Калории,ккал" >{props.calories}</Structure>
        <Structure structure="Белки, г">{props.proteins}</Structure>
        <Structure structure="Жиры, г">{props.fat}</Structure>
        <Structure structure="Углеводы, г">{props.carbohydrates}</Structure>
      </div>
    </div>
  );
};


Structure.propTypes = {
    structure: PropTypes.string.isRequired,
    children: PropTypes.number.isRequired
}

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
}