import { useAppSelector } from '@/hooks/store-hooks';
import { getAuthStatus } from '@/store/user/selectors';
import { AuthorizationStatus } from '@/utils/constant';
import { AppRoute } from '@/utils/constant';
import { Navigate } from 'react-router-dom';


type NotAuthRouteProps = {
  children: JSX.Element;
}

const UnauthorizedRoute = ({ children}: NotAuthRouteProps): JSX.Element => {
  const status = useAppSelector(getAuthStatus);
  const isAuthorized = status === AuthorizationStatus.Auth
  return (
    !isAuthorized ? children : <Navigate to={AppRoute.Personal}/>
  );
};

export default UnauthorizedRoute;

