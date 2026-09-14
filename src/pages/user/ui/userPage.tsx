import { useState } from 'react';

import { useNavigate } from 'react-router';

import { useDeleteMe, useUpdateMe } from '@/features/user';

import { useCurrentUser } from '@/entities/user';

import styles from './style.module.css';

function UserPage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  const updateMe = useUpdateMe();
  const deleteMe = useDeleteMe();

  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');

  const [password, setPassword] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleStartEditingProfile() {
    if (!user) {
      return;
    }

    setName(user.name);
    setEmail(user.email);

    setIsEditingProfile(true);
  }

  function handleCancelEditingProfile() {
    setIsEditingProfile(false);

    setName('');
    setEmail('');

    updateMe.reset();
  }

  function handleStartChangingPassword() {
    setCurrentPassword('');
    setPassword('');
    setPasswordConfirmation('');

    updateMe.reset();

    setIsChangingPassword(true);
  }

  function handleCancelChangingPassword() {
    setIsChangingPassword(false);

    setCurrentPassword('');
    setPassword('');
    setPasswordConfirmation('');

    updateMe.reset();
  }

  function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    updateMe.mutate(
      {
        name: trimmedName,
        email: trimmedEmail,
      },
      {
        onSuccess: () => {
          setIsEditingProfile(false);

          setName('');
          setEmail('');
        },
      },
    );
  }

  function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentPassword || !password) {
      return;
    }

    if (password !== passwordConfirmation) {
      return;
    }

    updateMe.mutate(
      {
        currentPassword,
        password,
      },
      {
        onSuccess: () => {
          setIsChangingPassword(false);

          setCurrentPassword('');
          setPassword('');
          setPasswordConfirmation('');
        },
      },
    );
  }

  function handleDeleteAccount() {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.',
    );

    if (!confirmed) {
      return;
    }

    deleteMe.mutate(undefined, {
      onSuccess: () => {
        navigate('/login', {
          replace: true,
        });
      },
    });
  }

  if (isLoading) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <p className={styles.message}>Carregando perfil...</p>
        </section>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <p className={styles.message}>
            Não foi possível carregar seu perfil.
          </p>
        </section>
      </main>
    );
  }

  const admin = user.id === 5;

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Minha conta</span>

            <h1 className={styles.title}>Meu perfil</h1>

            <p className={styles.subtitle}>
              Gerencie suas informações pessoais e configurações de segurança.
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Informações pessoais</h2>

              <p className={styles.sectionDescription}>
                Informações utilizadas na sua conta.
              </p>
            </div>

            {!isEditingProfile && (
              <button
                className={styles.secondaryButton}
                type='button'
                onClick={handleStartEditingProfile}
                disabled={isChangingPassword}
              >
                Editar perfil
              </button>
            )}
          </div>

          {isEditingProfile ? (
            <form className={styles.form} onSubmit={handleProfileSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor='name'>
                  Nome
                </label>

                <input
                  className={styles.input}
                  id='name'
                  name='name'
                  type='text'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={updateMe.isPending}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor='email'>
                  E-mail
                </label>

                <input
                  className={styles.input}
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={updateMe.isPending}
                />
              </div>

              {updateMe.isError && (
                <p className={styles.error}>
                  Não foi possível atualizar seus dados.
                </p>
              )}

              <div className={styles.formActions}>
                <button
                  className={styles.primaryButton}
                  type='submit'
                  disabled={updateMe.isPending}
                >
                  {updateMe.isPending ? 'Salvando...' : 'Salvar alterações'}
                </button>

                <button
                  className={styles.cancelButton}
                  type='button'
                  onClick={handleCancelEditingProfile}
                  disabled={updateMe.isPending}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.profileData}>
              <div className={styles.dataRow}>
                <div>
                  <span className={styles.dataLabel}>Nome</span>

                  <span className={styles.dataValue}>{user.name}</span>
                </div>
              </div>

              <div className={styles.dataRow}>
                <div>
                  <span className={styles.dataLabel}>E-mail</span>

                  <span className={styles.dataValue}>{user.email}</span>
                </div>
              </div>

              <div className={styles.dataRow}>
                <div>
                  <span className={styles.dataLabel}>E-mail verificado</span>

                  <span
                    className={
                      user.emailVerified
                        ? styles.statusSuccess
                        : styles.statusWarning
                    }
                  >
                    {user.emailVerified ? 'Verificado' : 'Não verificado'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {updateMe.isSuccess && !isEditingProfile && (
            <p className={styles.success}>Dados atualizados com sucesso.</p>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Segurança</h2>

              <p className={styles.sectionDescription}>
                Gerencie a senha utilizada para acessar sua conta.
              </p>
            </div>

            {!isChangingPassword && (
              <button
                className={styles.secondaryButton}
                type='button'
                onClick={handleStartChangingPassword}
                disabled={isEditingProfile}
              >
                Alterar senha
              </button>
            )}
          </div>

          {isChangingPassword ? (
            <form className={styles.form} onSubmit={handlePasswordSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor='currentPassword'>
                  Senha atual
                </label>

                <input
                  className={styles.input}
                  id='currentPassword'
                  name='currentPassword'
                  type='password'
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  disabled={updateMe.isPending}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor='password'>
                  Nova senha
                </label>

                <input
                  className={styles.input}
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={updateMe.isPending}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor='passwordConfirmation'>
                  Confirmar nova senha
                </label>

                <input
                  className={styles.input}
                  id='passwordConfirmation'
                  name='passwordConfirmation'
                  type='password'
                  value={passwordConfirmation}
                  onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                  }
                  disabled={updateMe.isPending}
                />

                {passwordConfirmation && password !== passwordConfirmation && (
                  <p className={styles.fieldError}>As senhas não coincidem.</p>
                )}
              </div>

              {updateMe.isError && (
                <p className={styles.error}>
                  Não foi possível alterar sua senha. Verifique sua senha atual.
                </p>
              )}

              <div className={styles.formActions}>
                <button
                  className={styles.primaryButton}
                  type='submit'
                  disabled={
                    updateMe.isPending || password !== passwordConfirmation
                  }
                >
                  {updateMe.isPending ? 'Salvando...' : 'Salvar nova senha'}
                </button>

                <button
                  className={styles.cancelButton}
                  type='button'
                  onClick={handleCancelChangingPassword}
                  disabled={updateMe.isPending}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.securityInfo}>
              <div>
                <span className={styles.dataLabel}>Senha</span>

                <span className={styles.dataValue}>••••••••••••</span>
              </div>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Informações da conta</h2>

              <p className={styles.sectionDescription}>
                Informações sobre sua conta no TaskBoard.
              </p>
            </div>
          </div>

          <div className={styles.accountData}>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Conta criada em</span>

              <span className={styles.dataValue}>
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Última atualização</span>

              <span className={styles.dataValue}>
                {new Date(user.updatedAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </section>

        {!admin && (
          <section className={styles.dangerSection}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.dangerTitle}>Zona de perigo</h2>

                <p className={styles.sectionDescription}>
                  A exclusão da sua conta é permanente e não pode ser desfeita.
                </p>
              </div>
            </div>

            <div className={styles.dangerContent}>
              <div>
                <span className={styles.dangerActionTitle}>Excluir conta</span>

                <p className={styles.dangerActionDescription}>
                  Sua conta e os dados associados serão removidos.
                </p>
              </div>

              <button
                className={styles.deleteButton}
                type='button'
                onClick={handleDeleteAccount}
                disabled={deleteMe.isPending}
              >
                {deleteMe.isPending ? 'Excluindo...' : 'Excluir conta'}
              </button>
            </div>

            {deleteMe.isError && (
              <p className={styles.error}>
                Não foi possível excluir sua conta. Tente novamente.
              </p>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export { UserPage };
