import LoginForm from '@/components/login-form/login-form';
import { ThemeContext } from '@/providers/theme-provider/theme-provider';
import {
  BackgroundColorVariants,
  TextColorVariants
} from '@/utils/constant';
import { useContext } from 'react';

function LoginPage(): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const textColor = TextColorVariants[theme];
  const backgroundColor = BackgroundColorVariants['login'];

  return (
    <div
      className={`login-page__wrapper w-screen h-screen flex justify-center items-center overflow-hidden ${backgroundColor} ${textColor}`}
    >
      <LoginForm />
    </div>
  );
}
export default LoginPage;
