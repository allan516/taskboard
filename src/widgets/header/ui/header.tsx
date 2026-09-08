import { useNavigate } from 'react-router';

import { useLogoutUser } from '@/features/auth';

import styles from './style.module.css';

function Header() {
  const navigate = useNavigate();
  const logoutUser = useLogoutUser();

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
        <span className={styles.logo}>TaskBoard</span>

        <button
          className={styles.logoutButton}
          type='button'
          onClick={handleLogout}
          disabled={logoutUser.isPending}
        >
          {logoutUser.isPending ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    </header>
  );
}

export { Header };
