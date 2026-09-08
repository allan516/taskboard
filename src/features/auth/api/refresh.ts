import { http } from '@/shared/api/http';

export function refresh() {
  return http<void>('/auth/refresh', {
    method: 'POST',
  });
}
