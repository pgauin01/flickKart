import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, deleteReview } from "../../store/actions/reviews";
import EditReview from "../../components/layout/editReview";

const Reviews = (props) => {
  const [screen, setScreen] = useState(false);
  const [prop, setProp] = useState({});
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const loading = useSelector((state) => state.ui.loading);
  // console.log(reviews);
  // console.log(loading);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const deleteReviewHandler = async (reviewId) => {
    // console.log(reviewId);
    await dispatch(deleteReview(reviewId));
  };

  const changeScreenHandler = (pro) => {
    setScreen(true);
    setProp(pro);
  };

  let reviewView;
  if (loading) {
    reviewView = (
      // <div className="loading">
      <img src="/loading.gif" />
      // </div>
    );
  } else if (reviews.reviews.length === 0) {
    // console.log("x");
    reviewView = (
      <div className="review">
        <p>No review added..</p>
      </div>
    );
  } else {
    reviewView = reviews.reviews.map((review) => {
      return (
        <div key={review.id} className="reviewScreen__block">
          <div className="reviewScreen__header">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => changeScreenHandler(review)}
            >
              <img src="/img/edit.png" className="reviewScreen__img" />
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => deleteReviewHandler(review.id)}
            >
              <img src="/img/delete.png" className="reviewScreen__img" />
            </div>
          </div>
          <div className="reviewScreen__description">
            <h3 className="u-margin-horizontal-small">{review.product.name}</h3>
            <h3 className="u-margin-horizontal-small">{review.rating}*</h3>
            <p className="u-margin-horizontal-small"> {review.review}</p>
          </div>
        </div>
      );
    });
  }

  if (screen) {
    reviewView = <EditReview data={prop} />;
  }

  return (
    <div className="reviewScreen">
      {screen ? null : (
        <h1 className="heading-secondary u-margin-bottom-small">My Reviews</h1>
      )}
      <div className="reviewScreen__container">{reviewView}</div>
    </div>
  );
};

export default Reviews;
