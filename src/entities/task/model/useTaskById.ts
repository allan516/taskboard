import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '../api/getTaskById';

export function useTaskById(id: number) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id),
  });
}
