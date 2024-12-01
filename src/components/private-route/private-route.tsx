import {Navigate} from 'react-router-dom';
import { AuthorizationStatus } from '../../data/authorization';
import { PathRoutes } from '../../data/routes';


type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={PathRoutes.LOGIN} />
  );
}

export default PrivateRoute;
