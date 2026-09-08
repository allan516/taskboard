import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './queryClient';
import { Router } from './router/router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export { App };
