import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { PathRoutes } from '../../data/routes';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/slices/user-slice/user-selector';


function App(): JSX.Element {


  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route
            path ={PathRoutes.MAIN}
            element={
              <MainPage />
            }
          >
          </Route>
          <Route
            path ={PathRoutes.LOGIN}
            element = {<LoginPage />}
          >
          </Route>
          <Route
            path ={PathRoutes.FAVORITES}
            element = {
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          >
          </Route>
          <Route
            path={PathRoutes.OFFER}
          >
            <Route
              path={PathRoutes.OFFERID}
              element={
                <OfferPage />
              }
            />
          </Route>
          <Route
            path ={PathRoutes.NOTFOUND}
            element = {<Page404/>}
          >
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
