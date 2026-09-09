import { BrowserRouter, Route, Routes } from 'react-router';

import { AdminPage } from '@/pages/admin';
import { LoginPage } from '@/pages/login';
import { TaskPage } from '@/pages/tasks';

import { AdminRoute } from './adminRoute';
import { ProtectedRoute } from './protectedRoute';
import { UserPage } from '@/pages/user';
import { RegisterPage } from '@/pages/register';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/tasks' element={<TaskPage />} />
          <Route path='/me' element={<UserPage />} />
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
