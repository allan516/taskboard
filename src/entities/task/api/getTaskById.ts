import type { Task } from '../model/task';

import { http } from '@/shared/api/http';

export function getTaskById(id: number) {
  return http<Task>(`/tasks/${id}`);
}
