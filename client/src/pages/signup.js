import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Input from "../components/UI/input";
import { SignupUser } from "../store/actions/user";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_VALIDATE = "FORM_VALIDATE";
const FORM_CLEAR = "FORM_CLEAR";

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

const formValidateor = (state, action) => {
  if (action.type === FORM_VALIDATE) {
    const updatedValidate = {
      ...state.validator,
      [action.name]: action.message,
    };

    return {
      validator: updatedValidate,
    };
  }
  if (action.type === FORM_CLEAR) {
    const clearValidate = {
      ...state.validator,
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
    return {
      validator: clearValidate,
    };
  }
  return state;
};

const Signup = (props) => {
  const [userError, setUserError] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [formValidate, dispatchFormValidate] = useReducer(formValidateor, {
    validator: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  // console.log(formValidate);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  // console.log(error);

  useEffect(() => {
    if (error) {
      // console.log(error);
      // console.log(error.code);
      if (error.code === 11000) {
        setUserError(true);
      }
      for (let key in error.errors) {
        dispatchFormValidate({
          type: FORM_VALIDATE,
          name: key,
          message: error.errors[key].message,
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (error) {
      if (formValidate.validator.password.startsWith("Path ")) {
        dispatchFormValidate({
          type: FORM_VALIDATE,
          name: "password",
          message: "password should be of minimum 8 character",
        });
      }
    }
  }, [error, formValidate]);

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
    await dispatch(SignupUser(formState.inputValues, props.history));
    await dispatchFormValidate({ type: FORM_CLEAR });
  };
  return (
    <section className="section-signup">
      <div className="signup">
        <div className="signup__form">
          <form action="" className="form" onSubmit={submitHandler}>
            <div className="form__img--container">
              <img src="../profile.png" className="form__img" />
            </div>
            {userError ? (
              <p className="form__validText">User already exists</p>
            ) : null}

            <Input
              type="text"
              name="name"
              placeholder="name"
              className="form__input"
              id="name"
              value={formState.inputValues.name}
              changed={(e) => inputChangeHandler(e.target.value, e.target.name)}
              required
              error={formValidate.validator.name}
            />

            <Input
              type="email"
              name="email"
              placeholder="Email address"
              className="form__input"
              id="email"
              value={formState.inputValues.email}
              changed={(e) => inputChangeHandler(e.target.value, e.target.name)}
              required
              error={formValidate.validator.email}
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
              error={formValidate.validator.password}
            />

            <Input
              name="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              className="form__input"
              id="passwordConfirm"
              value={formState.inputValues.passwordConfirm}
              required
              changed={(e) => inputChangeHandler(e.target.value, e.target.name)}
              error={formValidate.validator.passwordConfirm}
            />

            <div className="form__actions">
              <button className="btn btn__signup" onClick={submitHandler}>
                Signup
              </button>
              <button className="btn btn__login">
                <Link className="btn__login--link" to="/login">
                  Login
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
