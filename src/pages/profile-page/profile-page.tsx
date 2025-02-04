import InfoHeader from '@/components/info-header/info-header';
import ProfileInfo from '@/components/profile-info/profile-info';

function ProfilePage(): JSX.Element {

  return (
    <div className='info__wrapper px-[7px] py-1 sm:portrait:pl-[30px] md:landscape:pl-[30px] sm:pr-[28px] sm:portrait:py-[10px]  md:landscape:py-[10px] 2xl:pl-[50px] 2xl:pt-[34px] w-full md:w-[78%] lg:w-[90%]'>
       <InfoHeader
        icon='user'
        title='Профиль'
        type='profile'
      />
      <div className='info__list'>
        <ProfileInfo/>
      </div>
    </div>
  );
}

export default ProfilePage;
