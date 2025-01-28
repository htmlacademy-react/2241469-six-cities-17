import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-option/sort-option';
import { Offer } from '../../data/types/offer';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { Helmet } from 'react-helmet-async';
import { useCallback, useMemo, useState } from 'react';
import { getOffers, getOffersDataLoadingStatus } from '../../store/slices/offer-slice/offer-selector';
import { getCurrentCity } from '../../store/slices/city-slice/city-selector';
import OfferListEmpty from '../../components/offer-list-empty/offer-list-empty';


function MainPage():JSX.Element{

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const curCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getOffers);

  const offersInCurCity = useMemo(() => {
    if (!curCity) {
      return [];
    }
    return offers.filter((offer) => offer.city.name === curCity.name);
  }, [curCity, offers]);

  const handleChangeActiveCard = useCallback((curOffer: Offer | undefined) => {
    setSelectedOffer(curOffer);
  }, []);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  if (isOffersDataLoading) {
    return <Loader />;
  }

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
          {
            offersInCurCity.length === 0
              ? <OfferListEmpty currentCity={curCity}/>
              :
              (
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
                          <OfferList onOfferHover = {handleChangeActiveCard} offers = {offersInCurCity} />
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
                </div>)
          }
        </div>
      </main>
    </div>
  );
}

export default MainPage;

