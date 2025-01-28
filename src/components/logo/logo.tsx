import { Link } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';

const IMAGE_WIDTH = 81;
const IMAGE_HEIGHT = 41;

const Logo = (): JSX.Element => (
  <Link className="header__logo-link" to={PathRoutes.MAIN}>
    <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
  </Link>
);

export default Logo;
