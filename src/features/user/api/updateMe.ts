import type { User } from '@/entities/user';
import { http } from '@/shared/api/http';

export type UpdateMeInput = {
  name?: string;
  email?: string;
  currentPassword?: string;
  password?: string;
};

export function updateMe(data: UpdateMeInput) {
  return http<User>('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
