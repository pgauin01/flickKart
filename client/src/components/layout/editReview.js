import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../store/actions/reviews";

const EditReview = (props) => {
  //   console.log(props.data);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rating, SetRating] = useState(props.data.rating);
  const [review, SetReview] = useState(props.data.review);
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
    const updatedData = {
      review,
      rating,
    };
    dispatch(updateReview(props.data._id, updatedData));
  };

  const goBackscreen = () => {
    props.history.goBack();
  };
  return (
    <div className="userViewAddress__edit">
      <h1 className="u-margin-horizontal-medium">Edit Review</h1>
      <form onSubmit={inputSubmitHandler}>
        <div className="form__group">
          <label htmlFor="Rating" className="form__label form__label--center">
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
          <label htmlFor="Review" className="form__label form__label--center">
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
          <button
            className="btn btn--cart--2 u-margin-left-3"
            onClick={goBackscreen}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
