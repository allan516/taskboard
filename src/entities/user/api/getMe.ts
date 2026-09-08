import type { User } from '@/entities/user';

import { http } from '@/shared/api/http';

export function getMe() {
  return http<User>('/users/me');
}
