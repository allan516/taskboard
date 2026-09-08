import { http } from '@/shared/api/http';

export function deleteTask(id: number) {
  return http<void>(`/tasks/${id}`, {
    method: 'DELETE',
  });
}
