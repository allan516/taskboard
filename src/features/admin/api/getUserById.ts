import type { User } from '@/entities/user';

import { http } from '@/shared/api/http';

export function getUserById(id: number) {
  return http<User>(`/admin/users/${id}`);
}
