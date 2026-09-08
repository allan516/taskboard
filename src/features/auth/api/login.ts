import type { User } from '@/entities/user';
import { http } from '@/shared/api/http';

type LoginInput = {
  email: string;
  password: string;
};

export function login(data: LoginInput) {
  return http<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
