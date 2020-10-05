import { GET_REVIEW, DELETE_REVIEW, UPDATE_REVIEW } from "../types";

const initialState = {
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW:
      return {
        reviews: action.payload,
      };
    case UPDATE_REVIEW:
      const newReview = action.payload;
      const newReviewIndex = state.reviews.findIndex(
        (el) => el.id === newReview.id
      );
      const ReviewsArr = [...state.reviews];
      ReviewsArr[newReviewIndex] = newReview;
      return {
        reviews: ReviewsArr,
      };
    case DELETE_REVIEW:
      const updatedReviews = state.reviews.filter(
        (el) => el.id !== action.payload
      );
      return {
        reviews: updatedReviews,
      };
  }
  return state;
};

export default reducer;
