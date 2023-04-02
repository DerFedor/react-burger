import {
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './feed-details.module.css'
import {useSelector} from "../../services/hooks/hooks";
import {FC, useMemo} from "react";
import {useParams} from "react-router-dom";
import { TOrderIngredient} from "../../utils/types";


interface IIngredientDetail {
    item: TOrderIngredient;
}


const IngredientDetail: FC<IIngredientDetail> = ({item}) => {
    return (
        <li className={'pr-6 ' + style.ingr__details}>
            <div className={style.name__box}>
                <img className={style.ingr__image} src={item?.image}></img>
                <p className="ml-4 text text_type_main-default">{item?.name}</p>
            </div>
            <div className={style.price__box}>
                <p className="text text_type_digits-default">{`${item.quantityInOrder} x ${item?.price}`}</p>
                <CurrencyIcon type="primary"/>
            </div>
        </li>
    )
};

export const FeedDetails = () => {
    const {orders} = useSelector((state) => state.websocket)

    const {id} = useParams<{ id?: string }>();
    const data = orders.find(item => item._id === id);

    const ingredientsData = useSelector((state) => state.burger.ingredients);

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

    let orderIngredients: TOrderIngredient[] = [];  ////////////////////////////////////////////////////////////////////////////////////////
    data?.ingredients.forEach((item) => {
        const currentIngredient = ingredientsData.find((el) => el._id === item);
        if (currentIngredient) {
            if (orderIngredients.find(item => item._id === currentIngredient?._id) === undefined) {
                let q = data?.ingredients.filter(item => item === currentIngredient?._id).length;
                orderIngredients.push({...currentIngredient, quantityInOrder: q});
            }
        }
    });

    const doneStatus = () => {
        const doneStatus = data?.status === 'done' ? 'Выполнен' : data?.status === 'created' ? 'Создан' : data?.status === 'created' ? 'Готовится' : 'Отменен'
        return doneStatus
    }

    return (
        <div className={style.feed__details}>
            <h2 className="mt-10 text text_type_main-medium">{data?.name}</h2>
            <p className='mt-3 text text_type_main-default'
               style={data?.status === 'done' ? {color: 'green'} : {color: 'red'}}>{doneStatus()}</p>
            <div>
                <h2 className="mt-15 mb-6 text text_type_main-medium">Состав:</h2>
                <ul className={style.composition}>
                    {orderIngredients?.map((item, index) => <IngredientDetail key={index} item={item}/>)}
                </ul>
            </div>
            <div className={'mt-10 mb-10 ' + style.date__box}>
                <p className="text text_type_main-default text_color_inactive">{data?.createdAt.replace(/[A-Za-z]/gi, ' ').split('.')[0]}</p>
                <div className={style.price__box}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}




