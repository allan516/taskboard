import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLoginUser } from '@/features/auth';
import type { HttpError } from '@/shared/api/httpError';

import { loginFormSchema, type LoginFormData } from '../model/loginFormSchema';

import styles from './style.module.css';

function LoginPage() {
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const loginUser = useLoginUser();

  const navigate = useNavigate();

  function handleLogin(data: LoginFormData) {
    setLoginError('');

    loginUser.mutate(data, {
      onSuccess: () => {
        navigate('/tasks');
      },

      onError: (error) => {
        const httpError = error as HttpError;

        if (httpError.status === 401) {
          setLoginError('E-mail ou senha inválidos.');
          return;
        }

        setLoginError('Não foi possível realizar o login. Tente novamente.');
      },
    });
  }

  function handleRegister() {
    navigate('/register');
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>Login</h1>

        <p className={styles.subtitle}>Entre na sua conta para continuar</p>

        <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
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

          <button
            className={styles.button}
            type='submit'
            disabled={loginUser.isPending}
          >
            {loginUser.isPending ? 'Entrando...' : 'Entrar'}
          </button>

          {loginError && (
            <p className={styles.error} role='alert'>
              {loginError}
            </p>
          )}
        </form>

        <div className={styles.register}>
          <p className={styles.registerText}>Ainda não possui uma conta?</p>

          <button
            className={styles.registerButton}
            type='button'
            onClick={handleRegister}
          >
            Criar conta
          </button>
        </div>
      </section>
    </main>
  );
}

export { LoginPage };
