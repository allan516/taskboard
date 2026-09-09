import type { User } from '@/entities/user';

import { http } from '@/shared/api/http';

type UpdateUserStatusInput = {
  id: number;
  status: 'ACTIVE' | 'BLOCKED';
};

type UpdateUserStatusResponse = Pick<
  User,
  'id' | 'name' | 'email' | 'role' | 'status'
>;

export function updateUserStatus({ id, status }: UpdateUserStatusInput) {
  return http<UpdateUserStatusResponse>(`/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export type { UpdateUserStatusInput, UpdateUserStatusResponse };
