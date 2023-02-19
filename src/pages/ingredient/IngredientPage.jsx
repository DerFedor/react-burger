import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from './ingredient-page.module.css'
import PropTypes from "prop-types";


const Structure = (props) => {
    return (
        <div className={style.nutrient__box} >
            <p className="text text_type_main-default text_color_inactive">{props.structure}</p>
            <span className="text text_type_digits-default text_color_inactive">{props.children}</span>
        </div>
    );
};

Structure.propTypes = {
    structure: PropTypes.string,
    children: PropTypes.number
}

export const IngredientPage = () => {
    const { ingredients } = useSelector(state => state.burger)
    const params = useParams()
    const ingredientData = ingredients.find((item) => item._id === params.id)

    return (
        <>
            <section className={style.section}>
                <h1 className={"text text_type_main-large  " + style.header}>Детали ингредиента</h1>
                <div className={style.box}>
                    <img className={style.image} src={ingredientData?.image} alt={ingredientData?.name} />
                    <h2 className={"text text_type_main-medium pt-4 " + style.name}>{ingredientData?.name}</h2>
                    <div className={'mt-8 pb-15 ' + style.nutrients}>
                        <Structure structure="Калории,ккал" >{ingredientData?.calories}</Structure>
                        <Structure structure="Белки, г">{ingredientData?.proteins}</Structure>
                        <Structure structure="Жиры, г">{ingredientData?.fat}</Structure>
                        <Structure structure="Углеводы, г">{ingredientData?.carbohydrates}</Structure>
                    </div>
                </div>
            </section>
        </>
    )
}
