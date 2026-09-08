import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout } from '../api/logout';

export function useLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['me'],
      });
    },
  });
}
