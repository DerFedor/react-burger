import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyle from "./app-header.module.css";

export const AppHeader = () => {
  return (
    <header className={appHeaderStyle.header + " p-4"}>
      <a href="/#" className={appHeaderStyle.logo}>
        <Logo />
      </a>
      <nav className={appHeaderStyle.menu}>
        <ul className={appHeaderStyle.interface}>
          <li className={appHeaderStyle.interface__item}>
            <a href="#" className={appHeaderStyle.profile}>
            <BurgerIcon type="primary" />
            <p className="pl-3 text text_type_main-default">Конструктор</p>
            </a>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <a href="#" className={appHeaderStyle.profile}>
            <ListIcon type="secondary" />
            <p className="pl-3 text text_type_main-default text_color_inactive">Лента заказов</p>
            </a>
          </li>
        </ul>
        <a href="/#" className={appHeaderStyle.profile}>
          <ProfileIcon type="secondary" />
          <p className="pl-3 text text_type_main-default text_color_inactive">Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}
