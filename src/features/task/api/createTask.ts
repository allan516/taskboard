import type { Task } from '@/entities/task';

import { http } from '@/shared/api/http';

type CreateTaskInput = {
  title: string;
};

export function createTask(data: CreateTaskInput) {
  return http<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export type { CreateTaskInput };
