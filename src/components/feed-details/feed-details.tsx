import {
    Button,
    Input,
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './feed-details.module.css'
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

const testFeed = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3b41abdacab0026a733c6",
                "60d3b41abdacab0026a733c9",
                "60d3b41abdacab0026a733ce",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
            ],
            "_id": "345",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        },
        {
            "ingredients": [
                "60d3b41abdacab0026a733c6",
                "60d3b41abdacab0026a733c9",
                "60d3b41abdacab0026a733ce",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
                "60d3b41abdacab0026a733d1",
            ],
            "_id": "346",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
}


const IngredientDetail = ({ item }) => {
    const ingredients = useSelector((state:any) => state.burger.ingredients)
    const data = ingredients?.find((ingr) => ingr._id === item)


    return (
        <li className={'pr-6 ' + style.ingr__details}>
            <div className={style.name__box}>
                <img className={style.ingr__image} src={data.image}></img>
                <p className="ml-4 text text_type_main-default">{data.name}</p>
            </div>
            <div className={style.price__box}>
                <p className="text text_type_digits-default">{`1 x ${data?.price}`}</p>
                <CurrencyIcon type="primary" />
            </div>
        </li>
    )
}

export const FeedDetails = () => {
    const feed = useSelector((state:any) => state.feed.feedView)
    const data = testFeed.orders.find(item => item._id === feed)
    const ingredientsData = useSelector((state:any) => state.burger.ingredients);

    const price = useMemo(() => {
        let total = 0;
        data?.ingredients.forEach((item) => {
            const ingredient = ingredientsData.find((el) => el._id === item);
            if (ingredient) {
                total += ingredient.price;
            }
        });
        return total;
    }, [data, ingredientsData])

    const doneStatus = () => {
        const doneStatus = data?.status === 'done' ? 'Выполнен' : data?.status === 'created' ? 'Создан' : data?.status === 'created' ? 'Готовится' : 'Отменен'
        return doneStatus
    }

    return (
        <div className={style.feed__details}>
            <h2 className="mt-10 text text_type_main-medium">Black Hole Singularity острый бургер</h2>
            <p className='mt-3 text text_type_main-default' style={data?.status === 'done' ? { color: 'green' } : { color: 'red' }}>{doneStatus()}</p>
            <div>
                <h2 className="mt-15 text text_type_main-medium">Состав:</h2>
                <ul className={style.composition}>
                    {data?.ingredients.map((item, index) => <IngredientDetail key={index} item={item} />
                    )}
                </ul>
            </div>
            <div className={'mt-10 mb-10 ' + style.date__box}>
                <p className="text text_type_main-default text_color_inactive">{data?.createdAt}</p>
                <div className={style.price__box}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}