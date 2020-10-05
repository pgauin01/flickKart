import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddNewReview } from "../../store/actions/reviews";

const AddReview = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rating, SetRating] = useState("");
  const [review, SetReview] = useState("");
  //   console.log(review);
  // window.history.pushState(null, null, newPath);

  const inputHandler = (e) => {
    if (e.name === "Rating") {
      SetRating(e.value);
    } else if (e.name === "Review") {
      SetReview(e.value);
    }
  };
  const inputSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(AddNewReview(rating, review));
  };
  return (
    <>
      <section className="section-editForm">
        <div className="addForm">
          <form onSubmit={inputSubmitHandler}>
            <div className="form__group">
              <label
                htmlFor="Rating"
                className="form__label form__label--center"
              >
                Rating
              </label>
              <input
                type="number"
                max="5"
                min="1"
                name="Rating"
                id="Rating"
                className="form__input"
                value={rating}
                onChange={(event) => inputHandler(event.target)}
              />
            </div>
            <div className="form__group">
              <label
                htmlFor="Review"
                className="form__label form__label--center"
              >
                Review
              </label>
              <input
                type="text"
                name="Review"
                id="Review"
                className="form__input"
                value={review}
                onChange={(event) => inputHandler(event.target)}
              />
            </div>
            <div className="userViewAddress__actions u-margin-top-medium">
              <button className="btn btn--cart--1" onClick={inputSubmitHandler}>
                Submit
              </button>
              <button className="btn btn--cart--2 u-margin-left-3">
                cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddReview;
