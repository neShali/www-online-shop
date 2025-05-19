import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
