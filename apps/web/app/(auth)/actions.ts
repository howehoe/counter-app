'use server';

import { redirect } from 'next/navigation';
import { setSession } from '@/lib/session';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
  };
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function loginAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, error: 'ユーザー名とパスワードを入力してください' };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'ログインに失敗しました' };
    }

    const authData = data as AuthResponse;
    await setSession(authData.accessToken, authData.user);
  } catch {
    return { success: false, error: 'サーバーとの通信に失敗しました' };
  }

  redirect('/dashboard');
}

export async function signupAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!username || !password || !confirmPassword) {
    return { success: false, error: 'すべてのフィールドを入力してください' };
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'パスワードが一致しません' };
  }

  if (password.length < 6) {
    return { success: false, error: 'パスワードは6文字以上にしてください' };
  }

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || '登録に失敗しました' };
    }

    const authData = data as AuthResponse;
    await setSession(authData.accessToken, authData.user);
  } catch {
    return { success: false, error: 'サーバーとの通信に失敗しました' };
  }

  redirect('/dashboard');
}

