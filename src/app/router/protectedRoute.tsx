import { Navigate, Outlet } from 'react-router';

import { useCurrentUser } from '@/entities/user';
import { Header } from '@/widgets/header';

export function ProtectedRoute() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
