import type { Task } from '@/entities/task';

import { http } from '@/shared/api/http';

type UpdateTaskInput = {
  id: number;
  data: {
    title?: string;
    completed?: boolean;
  };
};

export function updateTask({ id, data }: UpdateTaskInput) {
  return http<Task>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export type { UpdateTaskInput };
