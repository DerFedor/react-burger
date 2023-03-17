import React, {FC} from "react";
import style from "./pages.module.css";
import {FeedsList} from "../components/feed-list/feed-list";
import {OrdersList} from "../components/orders-list/orders-list";

export const FeedPage: FC = () => {
  return (
      <>
          <section className={style.feeds__page}>
          {/*<h1 className="pt-10">Feed</h1>*/}
              <FeedsList />
              <OrdersList />
          </section>

      </>
  );
}

