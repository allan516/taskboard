import { Navigate, Outlet } from 'react-router';

import { useCurrentUser } from '@/entities/user';

function AdminRoute() {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <p>Verificando acesso...</p>;
  }

  if (!currentUser) {
    return <Navigate to='/login' replace />;
  }

  if (currentUser.id !== 5) {
    return <Navigate to='/tasks' replace />;
  }

  return <Outlet />;
}

export { AdminRoute };
