import { useState } from 'react';
import OfferCardsList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useSelector } from 'react-redux';
import { State } from '../../data/types/state';
import SortOptions from '../../components/sort-option/sort-option';
import { store } from '../../store';
import { Offer } from '../../data/types/offer';
import { useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';


function MainPage():JSX.Element{

  const [setSelectedOffer, setIsActive] = useState<Offer|null>(null);

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  const selectCity = (state: State) => state.city;
  const curCity = useSelector(selectCity);
  const offersInCurCity = store.getState().offers.filter((offer) => offer.city.name === curCity.name);

  const handleChangeActiveCard = (id:string | null) => {
    const currentOffer = offersInCurCity.find((offer) => offer.id === id) || null;
    setIsActive(currentOffer);
  };

  return (
    <div className="page page--gray page--main">
      <Header isLoggedIn />
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
                    <OfferCardsList onHandleChangeActiveCard = {handleChangeActiveCard} offers = {offersInCurCity}/>
                  </>
              }


            </section>
            <div className="cities__right-section">
              <Map
                offers={offersInCurCity}
                city={curCity}
                currentOffer={setSelectedOffer}
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
