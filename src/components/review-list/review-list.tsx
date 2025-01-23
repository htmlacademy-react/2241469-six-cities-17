import CommentForm from '../../pages/offer-page/comment-form';
import ReviewItem from '../review-item/review-item';
import { AuthorizationStatus } from '../../data/authorization';
import { useAppSelector } from '../../hooks';
import { Review, ReviewToSend } from '../../data/types/offer';
import { useEffect, useState } from 'react';
import { postCommentAction } from '../../store/api-actions';
import { store } from '../../store';


function isValidComment(oldComment: object): oldComment is Review {
  return (
    oldComment !== null &&
    typeof oldComment === 'object' &&
    'id' in oldComment &&
    'rating' in oldComment &&
    'comment' in oldComment &&
    'date' in oldComment &&
    'user' in oldComment
  );
}

function convertToComment(oldComment: object): Review | null {
  if (isValidComment(oldComment)) {
    return oldComment;
  } else {
    return null;
  }
}

function ReviewList(): JSX.Element {

  const [comments, setComments] = useState<Review[]>([]);

  const reviews = useAppSelector((state) => state.comments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    setComments(reviews);
  }, [reviews]);

  const addCommentHandler = async (commentData: ReviewToSend) => {
    const {payload} = await store.dispatch(postCommentAction(commentData));
    if (payload) {
      const newComment = convertToComment(payload);
      if (newComment) {
        setComments((prevComments) => [...prevComments, newComment]);
      }
    }
  };

  return (

    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">

        {reviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}

      </ul>

      {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm onFormSubmit={addCommentHandler} /> : ''}
    </section>
  );
}

export default ReviewList;
