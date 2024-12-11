import { Link } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';


const Logo = (): JSX.Element => (
  <Link className="header__logo-link" to={PathRoutes.MAIN}>
    <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
  </Link>
);

export default Logo;
