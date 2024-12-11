import { Link } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';
import Logo from '../logo/logo';


type HeaderProps = {
  isLoggedIn: boolean;
  }

const LoggedUser = (): JSX.Element => (
  <ul className="header__nav-list">
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={PathRoutes.FAVORITES}>
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        <span className="header__favorite-count">3</span>
      </Link>
    </li>
    <li className="header__nav-item">
      <Link className="header__nav-link" to={PathRoutes.MAIN}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  </ul>
);

const NotLoggedUser = (): JSX.Element => (
  <ul className="header__nav-list">
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={PathRoutes.LOGIN}>
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  </ul>
);

const Header = ({isLoggedIn}: HeaderProps):JSX.Element => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Logo />
        </div>
        <nav className="header__nav">
          {isLoggedIn ? <LoggedUser /> : <NotLoggedUser />}
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
