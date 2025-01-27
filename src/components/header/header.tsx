import { Link } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../data/authorization';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUserData } from '../../store/slices/user-slice/user-selector';
import { getFavoriteOffers, getOffers } from '../../store/slices/offer-slice/offer-selector';


function LoggedUser({ countFavorite }: { countFavorite: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={PathRoutes.FAVORITES}>
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          {userData && <span className="header__user-name user__name">{userData.email}</span>}
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

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? <LoggedUser countFavorite={favoriteOffers.length ?? 0} /> : <NotLoggedUser />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
