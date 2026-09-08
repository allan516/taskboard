import { useNavigate } from 'react-router';

import { useLogoutUser } from '@/features/auth';

import styles from './style.module.css';

function Header() {
  const navigate = useNavigate();

  const logoutUser = useLogoutUser();

  function handleTasks() {
    navigate('/tasks');
  }

  function handleProfile() {
    navigate('/me');
  }

  function handleLogout() {
    logoutUser.mutate(undefined, {
      onSuccess: () => {
        navigate('/login', {
          replace: true,
        });
      },
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.logo} type='button' onClick={handleTasks}>
          TaskBoard
        </button>

        <nav className={styles.navigation}>
          <button
            className={styles.navButton}
            type='button'
            onClick={handleTasks}
          >
            Tarefas
          </button>

          <button
            className={styles.navButton}
            type='button'
            onClick={handleProfile}
          >
            Meu perfil
          </button>

          <button
            className={styles.logoutButton}
            type='button'
            onClick={handleLogout}
            disabled={logoutUser.isPending}
          >
            {logoutUser.isPending ? 'Saindo...' : 'Sair'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export { Header };
