import { Fragment } from 'react';
import { COUNT_CHARACTER, StarTitles } from '../../data/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PathRoutes } from '../../data/routes';
import { ReviewToSend } from '../../data/types/offer';
import { useCommentForm } from '../../hooks/use-comment';
import { fetchCommentsAction } from '../../store/api-actions';


type CommentFormProps = {
  onFormSubmit: (commentData: ReviewToSend) => Promise<void>;
}


function CommentForm({onFormSubmit}: CommentFormProps): JSX.Element {

  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector((state) => state.currentOffer);

  const { formData, handleChange, isValid, handleSubmit, isSubmitting , resetForm} =
    useCommentForm({
      id: currentOffer?.id ?? '',
      rating: 0,
      comment: '',
    });

  const handleFormSubmit = async () => {
    await handleSubmit(onFormSubmit);
    dispatch(fetchCommentsAction(currentOffer?.id ?? ''));
  };

  return(
    <form onSubmit={(e) => {
      e.preventDefault();
      resetForm();
      handleFormSubmit();
    }} className="reviews__form form" action={`${PathRoutes.OFFER}/${currentOffer?.id}`} method="post"
    >

      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(StarTitles).map((star) => (
          <Fragment key={star[0]}>
            <input className="form__rating-input visually-hidden" name="rating" value={star[0]} id={`${star[0]}-stars`} type="radio"
              onChange={handleChange('rating')}
            />
            <label htmlFor={`${star[0]}-stars`} className="reviews__rating-label form__rating-label" title={star[1]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>)
        ).reverse()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange('comment')}
        value={formData.comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{COUNT_CHARACTER} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
      </div>
    </form>
  );
}

export default CommentForm;
