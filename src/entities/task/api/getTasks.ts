import { http } from '@/shared/api/http';
import type { Task } from '../model/task';

export function getTasks() {
  return http<Task[]>('/tasks');
}
