import { useAppSelector } from '@/hooks/store-hooks';
import { getAuthStatus } from '@/store/user/selectors';
import { AppRoute, AuthorizationStatus } from '@/utils/constant';
import { Navigate } from 'react-router-dom';


type PrivateRouteProps = {
  children:JSX.Element;
}
function PrivateRoute({children }:PrivateRouteProps): JSX.Element {
  const status = useAppSelector(getAuthStatus);
  const isAuthorized = status === AuthorizationStatus.Auth
  return (
    isAuthorized ? children : <Navigate to={AppRoute.Auth}/>
  );
}

export default PrivateRoute;
