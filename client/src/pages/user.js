import React, { useState } from "react";
import { Link } from "react-router-dom";

import AddressScreen from "../components/layout/Address";
import UserSettings from "../components/UI/userSettings";
import Review from "../components/layout/reviews";

const User = (props) => {
  let SettingScreen = <UserSettings />;
  let AddresScreen = <AddressScreen {...props} />;
  let ReviewScreen = <Review {...props} />;

  const [screen, SetIsScreen] = useState(SettingScreen);

  // const newPath = `/user/home`;
  // window.history.pushState(null, null, newPath);

  const ScreenChangeHandler = (screen) => {
    SetIsScreen(screen);
  };
  return (
    <section className="section-user">
      <main className="userview">
        <div className="userview__menu">
          <ul className="sidenav__list">
            <li
              className="sidenav__item"
              onClick={() => ScreenChangeHandler(SettingScreen)}
            >
              My Settings
            </li>
            <Link to="/user/wishlist">
              <li className="sidenav__item">Wishlist</li>
            </Link>
            <Link to="/user/orders">
              <li className="sidenav__item">Orders</li>
            </Link>
            <Link to="/user/cart">
              <li className="sidenav__item">Cart</li>
            </Link>
            <li
              className="sidenav__item"
              onClick={() => ScreenChangeHandler(ReviewScreen)}
            >
              My Reviews
            </li>
            <li
              className="sidenav__item"
              onClick={() => ScreenChangeHandler(AddresScreen)}
            >
              My Address
            </li>
          </ul>
        </div>
        {screen}
      </main>
    </section>
  );
};

export default User;
