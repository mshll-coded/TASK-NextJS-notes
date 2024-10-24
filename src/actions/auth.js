'use server';

import { revalidatePath } from 'next/cache';

import { baseUrl, getHeaders } from './config';
import { redirect } from 'next/navigation';
import { setToken, deleteToken } from '@/lib/token';

export async function login(formData) {
  const userData = Object.fromEntries(formData);

  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(userData),
  });

  let redirectPath = '/login';
  try {
    const { token } = await response.json();
    await setToken(token);
    redirectPath = '/notes';
  } catch (error) {
    console.error(error);
  } finally {
    redirect(redirectPath);
  }
}

export async function register(formData) {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    body: formData,
  });

  const { token } = await response.json();

  let redirectPath = '/register';
  try {
    const { token } = await response.json();
    await setToken(token);
    revalidatePath('/users');
    redirectPath = '/notes';
  } catch (error) {
    console.error(error);
  } finally {
    redirect(redirectPath);
  }
}

export async function logout() {
  await deleteToken();
  redirect('/');
}

export async function getAllUsers() {
  const response = await fetch(`${baseUrl}/auth/users`);
  const users = response.json();
  return users;
}
