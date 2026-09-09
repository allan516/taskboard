import { useQuery } from '@tanstack/react-query';

import { getUserById } from '../api/getUserById';

export function useGetUserById(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });
}
