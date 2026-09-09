import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUserStatus } from '../api/updateUserStatus';

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
}
