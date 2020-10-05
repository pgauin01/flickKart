import React, { useEffect, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMe, updatePassword } from "../../store/actions/user";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_ERROR = "FORM_ERROR";
const FORM_CLEAR = "FORM_CLEAR";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    // console.log(state);
    return {
      inputValues: updatedValues,
    };
  }

  return state;
};

const errorReducer = (state, action) => {
  if (action.type === FORM_ERROR) {
    const error = {
      ...state.errorValues,
      [action.name]: action.message,
    };
    return {
      errorValues: error,
    };
  }
  if (action.type === FORM_CLEAR) {
    const clearError = {
      ...state.errorValues,
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
    return {
      errorValues: clearError,
    };
  }
  return state;
};

const Usersettings = (props) => {
  const user = useSelector((state) => state.user.credentials);
  const error = useSelector((state) => state.ui.error);
  // console.log(error);
  // console.log(user);

  const { email, _id, name, photo } = user;
  const img = `/img/users/${photo}`;
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: name ? name : "",
      email: email ? email : "",
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
  });

  // console.log(formState);

  const [errorState, dispatchErrorState] = useReducer(errorReducer, {
    errorValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  // console.log(errorState);

  useEffect(() => {
    if (error) {
      for (let err in error.errors) {
        dispatchErrorState({
          type: FORM_ERROR,
          name: err,
          message: error.errors[err].message,
        });
      }
      if (error.message === "your current password is wrong") {
        dispatchErrorState({
          type: FORM_ERROR,
          name: "password",
          message: error.message,
        });
      }
    }
  }, [error]);

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
    dispatch(updateMe(formState.inputValues));
    await dispatchErrorState({ type: FORM_CLEAR });
  };

  const passwordUpdateHandler = async (e) => {
    e.preventDefault();
    dispatch(updatePassword(formState.inputValues));
    await dispatchErrorState({ type: FORM_CLEAR });
  };

  return (
    <div className="userview__content">
      <div className="userview__form-container">
        <h1
          style={{ letterSpacing: "1px" }}
          className="u-margin-bottom-medium u-margin-left-2 heading-color"
        >
          Your Account Settings
        </h1>
        <form className="form" onSubmit={submitHandler}>
          <div className="form__group">
            <label
              className="form__label--bold u-margin-bottom-small u-margin-left-3"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form__input"
              id="name"
              value={formState.inputValues.name}
              onChange={(e) =>
                inputChangeHandler(e.target.value, e.target.name)
              }
              required
              // error={formValidate.validator.email}
            />
            {errorState.errorValues.name ? (
              <p className="form__validText">{errorState.errorValues.name}</p>
            ) : null}
          </div>

          <div className="form__group">
            <label
              className="form__label--bold u-margin-bottom-small u-margin-left-3"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="form__input"
              id="email"
              value={formState.inputValues.email}
              onChange={(e) =>
                inputChangeHandler(e.target.value, e.target.name)
              }
              required
              // error={formValidate.validator.email}
            />
            {errorState.errorValues.email ? (
              <p className="form__validText">{errorState.errorValues.email}</p>
            ) : null}
          </div>
          {/* <div className="form__group form__photo--upload u-margin-left-2">
            <img className="form__user-photo" src={img} alt="User photo" />
            <input
              className="form__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
            />
            <label htmlFor="photo">Choose new photo</label>
          </div> */}
          <div className="form__group right">
            <button className="btn btn--red">Save Settings</button>
          </div>
        </form>
        <hr className="u-margin-top-medium u-margin-bottom-medium" />
        <div className="userview__form-container">
          <h1
            style={{ letterSpacing: "1px" }}
            className="u-margin-bottom-medium u-margin-left-2 heading-color"
          >
            Password Change
          </h1>
          <form onSubmit={passwordUpdateHandler}>
            <div className="form__group">
              <label
                className="form__label--bold u-margin-bottom-small u-margin-left-2"
                htmlFor="email"
              >
                Current Password
              </label>
              <input
                type="password"
                name="passwordCurrent"
                placeholder="*********"
                className="form__input"
                id="passwordCurrent"
                value={formState.inputValues.passwordCurrent}
                onChange={(e) =>
                  inputChangeHandler(e.target.value, e.target.name)
                }
                required
                // error={formValidate.validator.email}
              />
              {errorState.errorValues.password ? (
                <p className="form__validText">
                  {errorState.errorValues.password}
                </p>
              ) : null}
            </div>

            <div className="form__group">
              <label
                className="form__label--bold u-margin-bottom-small u-margin-left-2"
                htmlFor="email"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="*********"
                className="form__input"
                id="password"
                value={formState.inputValues.password}
                onChange={(e) =>
                  inputChangeHandler(e.target.value, e.target.name)
                }
                required
                // error={formValidate.validator.email}
              />
            </div>

            <div className="form__group">
              <label
                className="form__label--bold u-margin-bottom-small u-margin-left-2"
                htmlFor="email"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="*********"
                className="form__input"
                id="passwordConfirm"
                value={formState.inputValues.passwordConfirm}
                onChange={(e) =>
                  inputChangeHandler(e.target.value, e.target.name)
                }
                required
                // error={formValidate.validator.email}
              />
              {errorState.errorValues.passwordConfirm ? (
                <p className="form__validText">
                  {errorState.errorValues.passwordConfirm}
                </p>
              ) : null}
            </div>
            <div className="form__group right">
              <button className="btn btn--red">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Usersettings;
