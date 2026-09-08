import { http } from '@/shared/api/http';

export function deleteMe() {
  return http<void>('/users/me', {
    method: 'DELETE',
  });
}
