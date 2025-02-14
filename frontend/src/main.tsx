import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.scss'
import './styles/style.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
