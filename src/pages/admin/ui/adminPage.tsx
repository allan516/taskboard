import type { User } from '@/entities/user';

import {
  useDeleteUser,
  useGetUsers,
  useUpdateUserStatus,
} from '@/features/admin';

import styles from './style.module.css';

function AdminPage() {
  const { data: users, isLoading, isError } = useGetUsers();

  const updateUserStatus = useUpdateUserStatus();
  const deleteUser = useDeleteUser();

  // Temporariamente.
  // Depois vamos obter o ID através do usuário autenticado.
  const currentUserId = 5;

  function handleToggleStatus(
    id: number,
    status: 'ACTIVE' | 'BLOCKED' | undefined,
  ) {
    if (id === currentUserId || !status) {
      return;
    }

    const nextStatus = status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';

    updateUserStatus.mutate({
      id,
      status: nextStatus,
    });
  }

  function handleDeleteUser(id: number) {
    if (id === currentUserId) {
      return;
    }

    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este usuário?',
    );

    if (!confirmed) {
      return;
    }

    deleteUser.mutate(id);
  }

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p>Carregando usuários...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.page}>
        <p>Não foi possível carregar os usuários.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Usuários</h1>

            <p className={styles.subtitle}>
              Gerencie os usuários da aplicação.
            </p>
          </div>

          <span className={styles.count}>{users?.length ?? 0} usuários</span>
        </header>

        <section className={styles.userList}>
          {users?.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            users?.map((user: User) => {
              const isCurrentUser = user.id === currentUserId;

              const isUpdating =
                updateUserStatus.isPending &&
                updateUserStatus.variables?.id === user.id;

              const isDeleting =
                deleteUser.isPending && deleteUser.variables === user.id;

              return (
                <article key={user.id} className={styles.user}>
                  <div className={styles.userInfo}>
                    <div className={styles.userIdentity}>
                      <h2 className={styles.userName}>{user.name}</h2>

                      {isCurrentUser && (
                        <span className={styles.you}>Você</span>
                      )}
                    </div>

                    <p className={styles.email}>{user.email}</p>
                  </div>

                  <div className={styles.userMeta}>
                    <span
                      className={`${styles.badge} ${
                        user.role === 'ADMIN' ? styles.admin : styles.userRole
                      }`}
                    >
                      {user.role}
                    </span>

                    <span
                      className={`${styles.badge} ${
                        user.status === 'ACTIVE'
                          ? styles.active
                          : styles.blocked
                      }`}
                    >
                      {user.status === 'ACTIVE' ? 'Ativo' : 'Bloqueado'}
                    </span>

                    <span
                      className={`${styles.badge} ${
                        user.emailVerified ? styles.active : styles.unverified
                      }`}
                    >
                      {user.emailVerified
                        ? 'E-mail verificado'
                        : 'E-mail não verificado'}
                    </span>
                  </div>

                  <div className={styles.userDetails}>
                    <span className={styles.tasks}>
                      {user._count?.tasks ?? 0} tarefas
                    </span>

                    <span className={styles.createdAt}>
                      Cadastrado em{' '}
                      {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className={styles.actions}>
                    <button
                      className={styles.statusButton}
                      type='button'
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      disabled={isCurrentUser || isUpdating || isDeleting}
                    >
                      {isUpdating
                        ? 'Atualizando...'
                        : user.status === 'ACTIVE'
                          ? 'Bloquear'
                          : 'Desbloquear'}
                    </button>

                    <button
                      className={styles.deleteButton}
                      type='button'
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={isCurrentUser || isUpdating || isDeleting}
                    >
                      {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </section>
    </main>
  );
}

export { AdminPage };
