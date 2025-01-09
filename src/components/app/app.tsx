import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { PathRoutes } from '../../data/routes';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../../data/authorization';
import { Offer } from '../../data/types/offer';

type AppScreenProps = {
  offers: Offer[];
}

function App({offers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path ={PathRoutes.MAIN}
          element={<MainPage offers={offers} />}
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
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path ={PathRoutes.OFFER}
          element = {<OfferPage offers={offers}/>}
        >
        </Route>
        <Route
          path ={PathRoutes.NOTFOUND}
          element = {<Page404/>}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
