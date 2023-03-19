import {
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useMemo } from "react";
import style from './feed.module.css'
import bunTest from '../../images/bunTest.png'
import {useSelector} from "react-redux";


const IngredientIcon = ({ item, length }) => {
    const ingredients = useSelector((state:any) => state.burger.ingredients)
    const image = ingredients.find(ingr => ingr._id === item)
    // console.log(image)


    return (
        <li className={style.image__box}>
            <img src={image?.image || bunTest} className={style.picture} />
            <span className={"text text_type_main-default " + style.span}>{`+${length - 5}`}</span>
        </li>
    )
}
interface IFeed {
    feed: any;
    place?: string;
}

export const Feed = ({ feed, place }) => {

    const ingredientsData = useSelector((state:any) => state.burger.ingredients);
    // const ingredients = useSelector((state:any) => state.burger.ingredients)
    // const qwe = testData.map(item => console.log(ingredients.find(ingr => ingr._id === item)))

    // useEffect(() => {
    //     // testData.forEach(item => console.log(item))
    //     // console.log(testData.forEach(item => ingredients.find(ingr => ingr._id === item)))
    //     // console.log(ingredients)
    //     // console.log(feed)
    //     // console.log(qwe)
    // }, [ingredientsData])


    const price = useMemo(() => {
        let total = 0;
        feed.ingredients.forEach((item) => {
            const ingredient = ingredientsData.find((el) => el._id === item);
            if (ingredient) {
                total += ingredient.price;
            }
        });
        return total;
    }, [feed, ingredientsData])

    const doneStatus = () => {
        const doneStatus = feed?.status === 'done' ? 'Выполнен' : feed?.status === 'created' ? 'Создан' : feed?.status === 'pending' ? 'Готовится' : 'Отменен'
        return doneStatus
    }

    return (
        <li className={place === 'orders' ? style.feed__orders : style.feed}>
            <div className={style.numbers}>
                <h3 className="text text_type_digits-default">{feed.number}</h3>
                <p className="text text_type_main-default text_color_inactive">{feed.createdAt.replace(/[A-Za-z]/gi, ' ').split('.')[0]}</p>
            </div>
            <div className="pl-6 pr-6">
                <h2 className={"text text_type_main-medium " + style.feed__name}>{feed.name}</h2>
                {place === 'orders' &&
                    <p className="text text_type_main-default pt-2"
                       style={feed?.status === 'done'
                           ? { color: '#00CCCC' }
                           : feed?.status === 'cancel'
                               ? { color: 'red' }
                               : { color: '#F2F2F3' }}>
                        {doneStatus()}</p>}
            </div>
            <div className={style.last__box}>
                <ul className={style.pic__box}>
                    {feed.ingredients.map((item, index) => (
                        <IngredientIcon key={index}
                                        item={item}
                                        length={feed.ingredients.length} />
                    ))}
                </ul>
                <div className={style.price__box}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>)
}



