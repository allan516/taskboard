import { http } from '@/shared/api/http';

export function deleteUser(id: number) {
  return http<void>(`/admin/users/${id}`, {
    method: 'DELETE',
  });
}
