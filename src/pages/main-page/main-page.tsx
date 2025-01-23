import OfferCardsList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-option/sort-option';
import { Offer, OfferClick, OfferHover } from '../../data/types/offer';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { Helmet } from 'react-helmet-async';


type MainPageProps = {
  onOfferClick: OfferClick;
  onOfferHover: OfferHover;
  selectedOffer: Offer | undefined;
}

function MainPage({onOfferClick, onOfferHover, selectedOffer}: MainPageProps):JSX.Element{


  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  const curCity = useAppSelector((state) => state.city);

  const offersInCurCity = useAppSelector((state) => state.offers).filter((offer) => curCity && offer.city.name === curCity.name);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Main</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersInCurCity.length} places to stay in {curCity.name}</b>

              {
                isOffersDataLoading
                  ? <Loader />
                  :
                  <>
                    <SortOptions />
                    <OfferCardsList onOfferHover = {onOfferHover} offers = {offersInCurCity} onOfferClick={onOfferClick}/>
                  </>
              }

            </section>
            <div className="cities__right-section">
              <Map
                offers={offersInCurCity}
                city={curCity}
                currentOffer={selectedOffer}
                baseClass="cities"
                size={
                  { height: '100%' }
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

