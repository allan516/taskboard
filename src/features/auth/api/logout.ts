import { http } from '@/shared/api/http';

export function logout() {
  return http<void>('/auth/logout', {
    method: 'POST',
  });
}
