import { useMutation } from '@tanstack/react-query';

import { login } from '../api/login';

export function useLoginUser() {
  return useMutation({
    mutationFn: login,
  });
}
