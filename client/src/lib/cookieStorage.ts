const COOKIE_NAME = 'auth-storage';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function removeCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

export const cookieStorage: Storage = {
  getItem(key: string): string | null {
    return getCookie(key);
  },
  setItem(key: string, value: string): void {
    setCookie(key, value, COOKIE_MAX_AGE);
  },
  removeItem(key: string): void {
    removeCookie(key);
  },
  get length() {
    return 0;
  },
  clear(): void {
    removeCookie(COOKIE_NAME);
  },
  key(_index: number): string | null {
    return null;
  },
};
