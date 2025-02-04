import { AppRoute } from '@/utils/constant';
import { Link } from 'react-router-dom';
function ErrorPage(): JSX.Element {
  return (
    <div className='w-screen h-screen flex justify-center items-center overflow-hidden bg-purple-50'>
      <div className='login-form__container flex flex-col justify-center items-center text-center bg-purple-0 rounded-3xl lg:h-[427px] lg:w-[510px] p-6 lg:p-10'>
        <h1 className='text-5xl font-bold text-error mb-10'>404</h1>
        <h2 className='text-2xl font-bold mb-10'>Такой страницы не существует</h2>
        <Link className='text-xl underline' to={AppRoute.Personal}>На главную</Link>
      </div>
    </div>
  );
}

export default ErrorPage;
