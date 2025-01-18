import { Link } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../data/authorization';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';


type HeaderProps = {
    countFavorite?: number;
  }


function LoggedUser({ countFavorite }: { countFavorite: number }): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={PathRoutes.FAVORITES}>
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          <span className="header__favorite-count">{countFavorite}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link"
          to={PathRoutes.LOGIN}
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          } }
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

function NotLoggedUser(): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={PathRoutes.LOGIN}>
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

function Header({countFavorite }: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? <LoggedUser countFavorite={countFavorite ?? 0} /> : <NotLoggedUser />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
