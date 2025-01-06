
import { Review } from '../../data/types/offer';


type ReviewItemProps = {
  review: Review;
};

const formatTimeAsText = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(date);
};


function ReviewItem({review}: ReviewItemProps): JSX.Element {

  const date = new Date(review.date);
  const ratingPercent = review.rating * 20;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formatTimeAsText(date)}
        </time>
      </div>
    </li>
  );

}

export default ReviewItem;
