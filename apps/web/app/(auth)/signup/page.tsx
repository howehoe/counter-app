import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/session';
import { SignupForm } from './_components/signup-form';
import styles from '../auth.module.css';

export default async function SignupPage() {
  // 認証済みの場合はダッシュボードにリダイレクト
  if (await isAuthenticated()) {
    redirect('/dashboard');
  }

  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  );
}
