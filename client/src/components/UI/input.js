import React from "react";

const Input = (props) => {
  return (
    <div className="form__group">
      <input value={props.value} onChange={props.changed} {...props} />
      <label htmlFor="passwordconfirm" className="form__label">
        {props.error}
      </label>
    </div>
  );
};

export default Input;
