import { useState } from 'react';
import OfferCardsList from '../../components/offer-list/offer-list';
import { City, Offer } from '../../data/types/offer';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { store } from '../../store';
import CitiesList from '../../components/cities-list/cities-list';
import { changeCity } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { PathRoutes } from '../../data/routes';

type MainPageProps = {
  offers: Offer[];
}

function MainPage({offers}: MainPageProps):JSX.Element{

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isActiveCard, setIsActive] = useState<string|null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const curCity = store.getState().city;
  const offersInCurCity = offers.filter((offer) => offer.city.name === curCity.name);


  const citiesListClickHandler = (city: City) => {
    dispatch(changeCity(city));
    navigate(PathRoutes.MAIN);
  };

  const handleChangeActiveCard = (id:string | null) => {
    setIsActive(id);
  };

  return (
    <div className="page page--gray page--main">
      <Header isLoggedIn />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList onCityClick={citiesListClickHandler}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersInCurCity.length} places to stay in {curCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferCardsList onHandleChangeActiveCard = {handleChangeActiveCard} offers = {offersInCurCity}/>
            </section>
            <div className="cities__right-section">
              <Map
                offers={offersInCurCity}
                city={curCity}
                currentOffer={offers[0]}
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
