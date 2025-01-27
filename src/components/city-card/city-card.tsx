import { useCallback, useState } from 'react';
import { Offer, OfferHover } from '../../data/types/offer';
import { Link, useNavigate } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';
import { setError } from '../../store/slices/errors-slice/errors-slice';
import { store } from '../../store';
import { updateOfferFavoriteStatusAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/slices/user-slice/user-selector';
import { AuthorizationStatus } from '../../data/authorization';

type Props = {
  offer: Offer ;
  baseClass: string;
  imageSize: {
    width: number | string;
    height: number | string;
  };
  onOfferHover: OfferHover | undefined;
}


function CityCard({offer, baseClass, imageSize, onOfferHover}: Props):JSX.Element{

  const [currentOffer, setCurrentOffer] = useState<Offer>({} as Offer);
  const handleOfferClickHandler = useCallback((curOffer: Offer) => {
    setCurrentOffer({
      ...currentOffer,
      id: curOffer.id,
    });
  }, [currentOffer]);

  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(isFavorite);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const starsPercent = rating * 20;
  const toggleFavoriteStatusHandler = () => {
    try {
      if (authorizationStatus === AuthorizationStatus.Auth) {
        setIsUpdating(true);
        store.dispatch(updateOfferFavoriteStatusAction({offer, favoriteStatus}));
        setFavoriteStatus(!favoriteStatus);
      } else {
        navigate(PathRoutes.LOGIN);
      }
    } catch (err) {
      setError('Cant update status');
    } finally {
      setIsUpdating(false);
    }
  };


  return (

    <article className={`${baseClass}__card place-card`}
      id={`offer-${id}`}
      onClick={() => {
        setCurrentOffer({
          ...currentOffer,
          id: id
        });
        handleOfferClickHandler(offer);
      }}
      onMouseEnter={() => {
        if (onOfferHover) {
          onOfferHover(offer);
        }
      }}
    >

      { isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : '' }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${PathRoutes.OFFER}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button
            ${favoriteStatus ? 'place-card__bookmark-button--active' : ''}`} type="button"
          onClick={toggleFavoriteStatusHandler}
          disabled={isUpdating}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{favoriteStatus ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${starsPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${PathRoutes.OFFER}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default CityCard;
