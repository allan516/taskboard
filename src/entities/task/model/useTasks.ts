import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/getTasks';

export function useTasks() {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return query;
}
