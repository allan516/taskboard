import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router';

import { useRegisterUser } from '@/features/auth';

import {
  registerFormSchema,
  type RegisterFormData,
} from '../model/registerFormSchema';

import styles from './style.module.css';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const registerUser = useRegisterUser();

  const navigate = useNavigate();

  function handleRegister(data: RegisterFormData) {
    registerUser.mutate(data, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  }

  function handleLogin() {
    navigate('/login');
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>Criar conta</h1>

        <p className={styles.subtitle}>Crie sua conta para começar</p>

        <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor='name'>
              Nome
            </label>

            <input
              className={styles.input}
              id='name'
              type='text'
              placeholder='Seu nome'
              {...register('name')}
            />

            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor='email'>
              E-mail
            </label>

            <input
              className={styles.input}
              id='email'
              type='email'
              placeholder='seu@email.com'
              {...register('email')}
            />

            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor='password'>
              Senha
            </label>

            <input
              className={styles.input}
              id='password'
              type='password'
              placeholder='Digite sua senha'
              {...register('password')}
            />

            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          {registerUser.isError && (
            <p className={styles.error}>Não foi possível criar sua conta.</p>
          )}

          <button
            className={styles.button}
            type='submit'
            disabled={registerUser.isPending}
          >
            {registerUser.isPending ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <div className={styles.login}>
          <p className={styles.loginText}>Já possui uma conta?</p>

          <button
            className={styles.loginButton}
            type='button'
            onClick={handleLogin}
          >
            Voltar para o login
          </button>
        </div>
      </section>
    </main>
  );
}

export { RegisterPage };
