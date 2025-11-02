// Authentication service
const TOKEN_KEY = 'auth_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const login = async (username: string, password: string): Promise<string> => {
  // This should match your backend login endpoint
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  const token = data.token;
  setToken(token);
  return token;
};

export const logout = (): void => {
  removeToken();
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};