import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/user";

const Navbar = (props) => {
  const imgUrl = `/img/users/${props.user.photo}`;
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(logout());
    // window.reload();
  };
  let links = (
    <>
      <li className="navigation__item">
        <Link className="navigation__link" to="/">
          Home
        </Link>
      </li>
      <li className="navigation__item">
        <Link className="navigation__link" to="/products">
          Products
        </Link>
      </li>

      <li className="navigation__item">
        <Link className="navigation__link" to="/login">
          Login/Signup
        </Link>
      </li>
    </>
  );

  if (props.auth) {
    links = (
      <>
        <li className="navigation__item">
          <Link className="navigation__link" to="/">
            Home
          </Link>
        </li>
        <li className="navigation__item">
          <Link className="navigation__link" to="/products">
            Products
          </Link>
        </li>
        {/* <li className="navigation__item">
          <Link className="navigation__link" to="/user/cart">
            Cart
          </Link>
        </li> */}
        <li className="navigation__item">
          <div className="navigation__item--user">
            <img src={imgUrl} className="navigation__img" />
            <Link className="navigation__link" to="/user">
              {props.user.name}
            </Link>
          </div>
        </li>

        <li className="navigation__item">
          <Link className="navigation__link" to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </li>
      </>
    );
  }
  return (
    <nav className="navigation__nav">
      <ul className="navigation__list">
        {props.loading ? (
          <p>loading...</p>
        ) : (
          <Suspense fallback={<p>Loading....</p>}>{links}</Suspense>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
