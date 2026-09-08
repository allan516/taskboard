import { useMutation } from '@tanstack/react-query';

import { register } from '../api/register';

export function useRegisterUser() {
  return useMutation({
    mutationFn: register,
  });
}
