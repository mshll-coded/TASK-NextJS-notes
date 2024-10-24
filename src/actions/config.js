import { getToken } from '@/lib/token';

const baseUrl = 'https://task-react-auth-backend.eapi.joincoded.com/api';

async function getHeaders() {
  const token = await getToken();
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // Add an authorization header
  if (token) headers.append('Authorization', `Bearer ${token}`);

  return headers;
}

export { getHeaders, baseUrl };
