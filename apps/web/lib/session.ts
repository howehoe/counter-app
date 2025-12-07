'use server';

import { cookies } from 'next/headers';

const TOKEN_KEY = 'counter_app_token';
const USER_KEY = 'counter_app_user';

export interface User {
  id: string;
  username: string;
}

export async function getSession(): Promise<{ token: string | null; user: User | null }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value ?? null;
  const userStr = cookieStore.get(USER_KEY)?.value;
  
  let user: User | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch {
      user = null;
    }
  }
  
  return { token, user };
}

export async function setSession(token: string, user: User): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  
  cookieStore.set(USER_KEY, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
  cookieStore.delete(USER_KEY);
}

export async function isAuthenticated(): Promise<boolean> {
  const { token } = await getSession();
  return !!token;
}


