export type FinTrackUser = { name: string; email: string; password: string };

const USER_KEY = "fintrack-user";
const SESSION_KEY = "fintrack-session";

export function getStoredUser(): FinTrackUser | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(USER_KEY);
  return value ? (JSON.parse(value) as FinTrackUser) : null;
}

export function signUp(user: FinTrackUser) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email }));
}

export function logIn(email: string, password: string) {
  const user = getStoredUser();
  if (!user || user.email.toLowerCase() !== email.toLowerCase() || user.password !== password) return false;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email }));
  return true;
}

export function isLoggedIn() {
  return typeof window !== "undefined" && Boolean(window.localStorage.getItem(SESSION_KEY));
}

export function logOut() {
  window.localStorage.removeItem(SESSION_KEY);
}
