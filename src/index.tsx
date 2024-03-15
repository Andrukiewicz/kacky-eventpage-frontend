import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { ColorModeScript } from '@chakra-ui/react';

import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element with id "root" not found');
}
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </StrictMode>
);
