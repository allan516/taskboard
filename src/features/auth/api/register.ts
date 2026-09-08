import type { User } from '@/entities/user';
import { http } from '@/shared/api/http';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export function register(data: RegisterInput) {
  return http<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export type { RegisterInput };
