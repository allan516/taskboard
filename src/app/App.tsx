// import { Router } from './router/router';

// function App() {
//   return <Router />;
// }

// export { App };

import { useEffect } from 'react';

import { getMe } from '@/features/auth/api/getMe';

function App() {
  useEffect(() => {
    getMe()
      .then((user) => {
        console.log('Usuário autenticado:', user);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuário:', error);
      });
  }, []);

  return <h1>TaskBoard</h1>;
}

export { App };
