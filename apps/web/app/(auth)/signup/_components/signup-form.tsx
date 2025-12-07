'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { signupAction, type ActionResult } from '../../actions';
import styles from '../../auth.module.css';

const initialState: ActionResult = {
  success: false,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? '登録中...' : '新規登録'}
    </button>
  );
}

export function SignupForm() {
  const [state, formAction] = useFormState(signupAction, initialState);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>Counter App</h1>
        <p className={styles.subtitle}>新規登録</p>
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
            minLength={3}
            maxLength={20}
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
            minLength={6}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="confirmPassword">パスワード（確認）</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••"
            required
          />
        </div>

        <SubmitButton />
      </form>

      <p className={styles.footer}>
        すでにアカウントをお持ちの方は{' '}
        <Link href="/login">ログイン</Link>
      </p>
    </div>
  );
}

