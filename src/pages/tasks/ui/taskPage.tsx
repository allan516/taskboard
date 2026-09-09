import { useState } from 'react';

import { useCreateTask, useDeleteTask, useUpdateTask } from '@/features/task';

import { useCurrentUser } from '@/entities/user';

import { useTasks } from '@/entities/task';

import styles from './style.module.css';

function TaskPage() {
  const [title, setTitle] = useState('');

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const [editingTitle, setEditingTitle] = useState('');

  const { data: tasks, isLoading, isError } = useTasks();

  const { data: user } = useCurrentUser();

  const createTask = useCreateTask();

  const updateTask = useUpdateTask();

  const deleteTask = useDeleteTask();

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    createTask.mutate(
      {
        title: title.trim(),
      },
      {
        onSuccess: () => {
          setTitle('');
        },
      },
    );
  }

  function handleToggleTask(id: number, completed: boolean) {
    updateTask.mutate({
      id,
      data: {
        completed: !completed,
      },
    });
  }

  function handleStartEditing(id: number, currentTitle: string) {
    setEditingTaskId(id);
    setEditingTitle(currentTitle);
  }

  function handleCancelEditing() {
    setEditingTaskId(null);
    setEditingTitle('');
  }

  function handleSaveTitle(id: number) {
    const title = editingTitle.trim();

    if (!title) {
      return;
    }

    updateTask.mutate(
      {
        id,
        data: {
          title,
        },
      },
      {
        onSuccess: () => {
          handleCancelEditing();
        },
      },
    );
  }

  function handleDeleteTask(id: number, title: string) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a tarefa "${title}"?`,
    );

    if (!confirmed) {
      return;
    }

    deleteTask.mutate(id);
  }

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p>Carregando tarefas...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.page}>
        <p>Não foi possível carregar as tarefas.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.greeting}>Olá, {user?.name}! 👋</p>

            <h1 className={styles.title}>Minhas tarefas</h1>

            <p className={styles.subtitle}>Gerencie suas tarefas</p>
          </div>

          <form className={styles.createForm} onSubmit={handleCreateTask}>
            <input
              className={styles.input}
              type='text'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder='Nova tarefa'
            />

            <button
              className={styles.button}
              type='submit'
              disabled={createTask.isPending}
            >
              {createTask.isPending ? 'Criando...' : 'Adicionar'}
            </button>
          </form>
        </header>

        <section className={styles.taskList}>
          {tasks?.length === 0 ? (
            <p>Nenhuma tarefa encontrada.</p>
          ) : (
            tasks?.map((task) => (
              <article key={task.id} className={styles.task}>
                {editingTaskId === task.id ? (
                  <div className={styles.editContent}>
                    <input
                      className={styles.input}
                      type='text'
                      value={editingTitle}
                      onChange={(event) => setEditingTitle(event.target.value)}
                      autoFocus
                    />

                    <div className={styles.editActions}>
                      <button
                        className={styles.button}
                        type='button'
                        onClick={() => handleSaveTitle(task.id)}
                        disabled={updateTask.isPending}
                      >
                        {updateTask.isPending ? 'Salvando...' : 'Salvar'}
                      </button>

                      <button
                        className={styles.secondaryButton}
                        type='button'
                        onClick={handleCancelEditing}
                        disabled={updateTask.isPending}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.taskContent}>
                    <input
                      type='checkbox'
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id, task.completed)}
                      disabled={updateTask.isPending || deleteTask.isPending}
                    />

                    <div className={styles.taskInfo}>
                      <h2
                        className={`${styles.taskTitle} ${
                          task.completed ? styles.completed : ''
                        }`}
                      >
                        {task.title}
                      </h2>

                      <p className={styles.taskStatus}>
                        {task.completed ? 'Concluída' : 'Pendente'}
                      </p>
                    </div>

                    <div className={styles.taskActions}>
                      {!task.completed && (
                        <button
                          className={styles.editButton}
                          type='button'
                          onClick={() =>
                            handleStartEditing(task.id, task.title)
                          }
                          disabled={
                            updateTask.isPending || deleteTask.isPending
                          }
                        >
                          Editar
                        </button>
                      )}

                      <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={() => handleDeleteTask(task.id, task.title)}
                        disabled={updateTask.isPending || deleteTask.isPending}
                      >
                        {deleteTask.isPending ? 'Excluindo...' : 'Excluir'}
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export { TaskPage };
