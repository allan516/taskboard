import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMe } from '../api/deleteMe';

export function useDeleteMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMe,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['me'],
      });
    },
  });
}
