import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import CityCard from '../../components/city-card/city-card';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import Page404 from '../page-404/page-404';
import { useEffect } from 'react';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearestOfferAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { store } from '../../store';
import { getCurrentCity } from '../../store/slices/city-slice/city-selector';
import { getCurrentOffer, getNearestOffers, getOffersDataLoadingStatus } from '../../store/slices/offer-slice/offer-selector';


function useOfferData(currentId: string) {
  useEffect(() => {
    store.dispatch(fetchCommentsAction(currentId));
    store.dispatch(fetchCurrentOfferAction(currentId));
    store.dispatch(fetchNearestOfferAction(currentId));
  }, [currentId]);
}


function OfferPage():JSX.Element{

  const { id: currentId } = useParams<{ id: string }>();

  useOfferData(currentId!);


  const currentCity = useAppSelector(getCurrentCity);
  const currentOffer = useAppSelector(getCurrentOffer);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  const offersNear = useAppSelector(getNearestOffers);

  if (isOffersDataLoading || !currentOffer) {
    return <Loader />;
  }

  if (!currentOffer) {
    return <Page404 />;
  }


  const starsPercent = currentOffer.rating * 20;

  return (
    <div className="page">

      <Helmet>
        <title>Offer Details</title>
      </Helmet>

      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">

          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={currentOffer.id + image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${starsPercent}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms > 1 ? `${currentOffer.bedrooms} Bedrooms` : `${currentOffer.bedrooms} Bedroom`}
                </li>
                <li className="offer__feature offer__feature--adults">
                Max {currentOffer.maxAdults > 1 ? ` ${currentOffer.maxAdults} adults` : `${currentOffer.maxAdults} adult`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={currentOffer.id + good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro
                    ? (
                      <span className="offer__user-status">
                          Pro
                      </span>
                    )
                    : ''}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <ReviewList />
            </div>
          </div>

          <Map
            offers={offersNear}
            baseClass="offer"
            city={currentCity}
            currentOffer={currentOffer}
          />

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <div className="near-places__list places__list">
              {offersNear.map((item) => (
                <CityCard
                  key={item.id}
                  baseClass="near-places"
                  imageSize={{ width: 260, height: 200 }}
                  offer={item}
                  onOfferHover={undefined}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );

}

export default OfferPage;

