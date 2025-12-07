import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/session';
import { LoginForm } from './_components/login-form';
import styles from '../auth.module.css';

export default async function LoginPage() {
  // 認証済みの場合はダッシュボードにリダイレクト
  if (await isAuthenticated()) {
    redirect('/dashboard');
  }

  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
