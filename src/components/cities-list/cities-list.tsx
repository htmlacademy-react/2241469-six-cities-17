import { useDispatch, useSelector } from 'react-redux';
import { Cities } from '../../data/const';
import { City } from '../../data/types/offer';
import { Link } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';
import { getCurrentCity } from '../../store/slices/city-slice/city-selector';
import { changeCity } from '../../store/slices/city-slice/city-slice';
import { resetSort } from '../../store/slices/offer-slice/offer-slice';


function CitiesList(): JSX.Element {

  const dispatch = useDispatch();


  const activeCity = useSelector(getCurrentCity);

  const handleCityChange = (changedCity: City) => {
    dispatch(changeCity(changedCity));
    dispatch(resetSort());
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
