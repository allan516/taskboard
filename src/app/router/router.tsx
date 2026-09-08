import { BrowserRouter, Route, Routes } from 'react-router';

import { LoginPage } from '@/pages/login';
import { TaskPage } from '@/pages/tasks';

import { ProtectedRoute } from './protectedRoute';
import { RegisterPage } from '@/pages/register';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/tasks' element={<TaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
