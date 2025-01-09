import CommentForm from '../../pages/offer-page/comment-form';
import { Review } from '../../data/types/offer';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
    reviews: Review[];
  }

function ReviewList({reviews}: ReviewListProps): JSX.Element {


  return (

    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">

        {reviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}

      </ul>
      <CommentForm />
    </section>
  );
}

export default ReviewList;
