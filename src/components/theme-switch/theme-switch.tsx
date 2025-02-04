import { useContext } from 'react';
import { ThemeContext } from '@/providers/theme-provider/theme-provider';
import sprite from '/sprite.svg';
import { Button } from '../ui/button';

function ThemeSwitch(): JSX.Element {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
      <Button onClick={() => toggleTheme()} variant={'outline'} className={`[&_svg]:size-2 lg:[&_svg]:size-3 p-1 w-4 max-h-4 lg:w-6 lg:max-h-6 hover:bg-purple-50 focus-visible:ring-purple-500 focus:outline-purple-500`} >
      <svg className='theme-switch__icon'>
            <use xlinkHref={`${sprite}#${isDark ?'sun':'moon'}`}></use>
          </svg>
          </Button>
  );
}

export default ThemeSwitch;
