import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { ColorModeScript } from '@chakra-ui/react';

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element with id "root" not found');
}
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
