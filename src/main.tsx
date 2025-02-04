import { Toaster } from '@/components/ui/toaster.tsx';
import ThemeProvider from '@/providers/theme-provider/theme-provider.tsx';
import { store } from '@/store';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
