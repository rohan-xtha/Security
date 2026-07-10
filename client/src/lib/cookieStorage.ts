const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.split('=');
    if (key.trim() === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
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
    return document.cookie.split(';').filter(Boolean).length;
  },
  clear(): void {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      removeCookie(name);
    });
  },
  key(index: number): string | null {
    const cookies = document.cookie.split(';');
    return cookies[index]?.split('=')[0].trim() ?? null;
  },
};
