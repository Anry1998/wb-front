import sprite from '/sprite.svg';

function EmptyItems(): JSX.Element {
    return (
        <div className='h-[40vh] max-w-[98%] flex flex-col justify-center items-center'>
        {' '}
        <svg className='size-[20%] max-w-24'>
          <use xlinkHref={`${sprite}#companies-empty`}></use>
        </svg>
        <span className='text-purple-100 text-basic'>
          {' '}
          Вы еще не создали подходящие элементы
        </span>
      </div>
    );
  }
  
  export default EmptyItems;