import { useQuery } from '@tanstack/react-query';

import { isHttpError } from '@/shared/api/isHttpError';

import { getMe } from '../api/getMe';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: (failureCount, error) => {
      if (isHttpError(error) && error.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
  });
}
