import { getRaskItem } from '@/utils/helpers';
import { createContext, useState } from 'react';

type ThemeType = 'dark' | 'light';

type ThemeContextProps = {
  theme:ThemeType , 
  toggleTheme: ()=> void
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

function ThemeProvider({ children }: ThemeProviderProps) {
  const currentTheme = getRaskItem('theme-type')|| 'light';
  const [theme, setTheme] = useState(currentTheme as ThemeType);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('rask-theme-type', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
