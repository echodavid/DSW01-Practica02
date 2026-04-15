import { setToken, getToken, clearAuth, setCurrentUser, getCurrentUser, isAuthenticated } from '../auth.js';

describe('auth storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('stores and retrieves token', () => {
    setToken('abc');
    expect(getToken()).toBe('abc');
    expect(isAuthenticated()).toBe(true);
  });

  test('stores and retrieves current user', () => {
    setCurrentUser('master@domain.com');
    expect(getCurrentUser()).toBe('master@domain.com');
  });

  test('clears auth data', () => {
    setToken('abc');
    setCurrentUser('user');
    clearAuth();
    expect(getToken()).toBeNull();
    expect(getCurrentUser()).toBeNull();
    expect(isAuthenticated()).toBe(false);
  });
});
