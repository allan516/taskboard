import { BrowserRouter, Route, Routes } from 'react-router';

import { LoginPage } from '@/pages/login';
import { TaskPage } from '@/pages/tasks';
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/tasks' element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
