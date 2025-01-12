import { useDispatch, useSelector } from 'react-redux';
import { Cities } from '../../data/const';
import { City } from '../../data/types/offer';
import { changeCity } from '../../store/action';
import { Link } from 'react-router-dom';
import { State } from '../../data/types/state';
import { PathRoutes } from '../../data/routes';


function CitiesList(): JSX.Element {

  const dispatch = useDispatch();

  const selectCity = (state: State) => state.city;
  const activeCity = useSelector(selectCity);

  const handleCityChange = (cityName: City) => {
    dispatch(changeCity(cityName));
  };


  return (
    <ul className="locations__list tabs__list">
      {Object.values(Cities)
        .map((city) => (
          <li className="locations__item" key={city.name} onClick={() => handleCityChange(city) }>
            <Link
              to={PathRoutes.MAIN}
              className={`locations__item-link tabs__item${activeCity.name === city.name ? ' tabs__item--active' : ''}`}
              onClick={() => handleCityChange(city)}
            >
              <span>{city.name}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
export default CitiesList;
