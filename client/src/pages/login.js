import React, { useEffect, useState, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/UI/input";
import { loginUser } from "../store/actions/user";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    return {
      inputValues: updatedValues,
    };
  }
  return state;
};

const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  // console.log(errorMessage);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  // console.log(error);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
  });

  const inputChangeHandler = useCallback(
    (inputValue, inputIdentifier) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formState.inputValues, props.history));
  };
  return (
    <section className="section-signup">
      <div className="signup">
        <div className="signup__form">
          <form action="" className="form" onSubmit={submitHandler}>
            <div className="form__img--container">
              <img src="../profile.png" className="form__img" />
            </div>

            {errorMessage ? (
              <p className="form__validText">{errorMessage} </p>
            ) : null}

            <Input
              type="email"
              name="email"
              placeholder="Email address"
              className="form__input"
              id="email"
              value={formState.inputValues.email}
              changed={(e) => inputChangeHandler(e.target.value, e.target.name)}
              required
              // error={formValidate.validator.email}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="form__input"
              id="password"
              value={formState.inputValues.password}
              changed={(e) => inputChangeHandler(e.target.value, e.target.name)}
              required
              // error={formValidate.validator.password}
            />

            <div className="form__actions">
              <button className="btn btn__signup" onClick={submitHandler}>
                Login
              </button>
              <button className="btn btn__login">
                <Link className="btn btn__login--link" to="/signup">
                  Signup
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
