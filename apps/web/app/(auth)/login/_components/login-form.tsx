'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { loginAction, type ActionResult } from '../../actions';
import styles from '../../auth.module.css';

const initialState: ActionResult = {
  success: false,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'ログイン中...' : 'ログイン'}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>Counter App</h1>
        <p className={styles.subtitle}>ログイン</p>
      </div>

      <form action={formAction} className={styles.form}>
        {state.error && <div className={styles.error}>{state.error}</div>}

        <div className={styles.field}>
          <label htmlFor="username">ユーザー名</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            required
          />
        </div>

        <SubmitButton />
      </form>

      <p className={styles.footer}>
        アカウントをお持ちでない方は{' '}
        <Link href="/signup">新規登録</Link>
      </p>
    </div>
  );
}

