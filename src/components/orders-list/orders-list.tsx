import style from './orders-list.module.css'
import {useSelector} from "../../services/hooks/hooks";
import {FC} from "react";


export const OrdersList: FC = () => {
    const {total, orders, totalToday} = useSelector(state => state.websocket)
    return (
        <section className='pt-25'>
            <div className={style.orders__box}>
                <div className={style.list__box}><h2 className="mb-6 text text_type_main-medium">Готовы:</h2>
                    <ul className={style.orders__list}>
                        {orders?.map(item => {
                                // console.log(item.status)
                                if (item.status === 'done') {
                                    return (
                                        <li className={"text text_type_digits-default " + style.ready}
                                            key={item._id}>{item.number}</li>
                                    )
                                }
                            }
                        )}
                    </ul>
                </div>
                <div className={style.list__box}><h2 className="mb-6 text text_type_main-medium">В работе:</h2>
                    <ul className={style.orders__list}>
                        {orders?.map(item => {
                                // console.log(item.status)
                                if (item.status !== 'done') {
                                    return (
                                        <li className={"text text_type_digits-default "} key={item._id}>{item.number}</li>)
                                }
                            }
                        )}
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="mt-15 text text_type_main-default">Выполнено за все время:</h2>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div>
                <h2 className="mt-15 text text_type_main-default">Выполнено за сегодня:</h2>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </section>
    )
}