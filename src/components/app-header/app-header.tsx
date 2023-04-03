import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyle from "./app-header.module.css";
import {Link, NavLink} from "react-router-dom";
import {onActiveLink} from "../../utils/onActiveLink";
import {FC} from "react";
import {useSelector} from "../../services/hooks/hooks";


export const AppHeader: FC = () => {
    const {isAuthenticated, userName} = useSelector((state) => state.user);
    return (
        <header className={appHeaderStyle.header + " p-4"}>
            <Link to="/" className={appHeaderStyle.logo}>
                <Logo/>
            </Link>
            <nav className={appHeaderStyle.menu}>
                <ul className={appHeaderStyle.interface}>
                    <li className={appHeaderStyle.interface__item}>
                        <NavLink
                            to="/"
                            className={appHeaderStyle.link + " text_color_inactive"}
                            style={onActiveLink}
                        >
                            {({isActive}) => (
                                <>
                                    <BurgerIcon type={isActive ? "primary" : "secondary"}/>
                                    <p className="pl-3 text text_type_main-default">Конструктор</p>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className={appHeaderStyle.interface__item}>
                        <NavLink to="/feed" className={appHeaderStyle.link} style={onActiveLink}>
                            {({isActive}) => (
                                <>
                                    <ListIcon type={isActive ? "primary" : "secondary"}/>
                                    <p className="pl-3 text text_type_main-default">Лента заказов</p>
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>
                <li className={appHeaderStyle.interface__item} data-testid="personalText">
                    <NavLink
                        to={isAuthenticated ? "/profile" : "/login"}
                        className={appHeaderStyle.link}
                        style={onActiveLink}>
                        {({isActive}) => (
                            <>
                                <ProfileIcon type={isActive ? "primary" : "secondary"}/>
                                {/*<p className="pl-3 text text_type_main-default">Личный кабинет</p>*/}
                                {isAuthenticated && userName ? (
                                    <span className="pl-3 text text_type_main-default text_color_inactive">{userName}</span>
                                ) : (
                                    <span className="pl-3 text text_type_main-default text_color_inactive">
                                        Личный кабинет
                                    </span>)}
                            </>
                        )}
                    </NavLink>
                </li>
            </nav>
        </header>
    );
}
