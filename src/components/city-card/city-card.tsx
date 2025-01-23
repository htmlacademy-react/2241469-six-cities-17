import { useState } from 'react';
import { Offer, OfferClick, OfferHover } from '../../data/types/offer';
import { Link } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';

type Props = {
  offer: Offer ;
  baseClass: string;
  imageSize: {
    width: number | string;
    height: number | string;
  };
  onOfferHover: OfferHover;
  onOfferClick: OfferClick;
}


function CityCard({offer, baseClass, imageSize, onOfferHover,onOfferClick}: Props):JSX.Element{

  const [currentOffer, setCurrentOffer] = useState<Offer>({} as Offer);

  const {id, title, type, price, previewImage, isFavorite, isPremium} = offer;
  return (

    <article className={`${baseClass}__card place-card`}
      id={`offer-${id}`}
      onClick={() => {
        setCurrentOffer({
          ...currentOffer,
          id: id
        });
        onOfferClick(offer);
      }}
      onMouseEnter={() => onOfferHover(offer)}
    >

      { isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : '' }
      <div className={`${baseClass}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            style={{ ...imageSize }}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button
            ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: offer.rating}}></span>
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
