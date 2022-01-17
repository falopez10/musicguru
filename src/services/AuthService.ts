import { removeLocalStorageItem, setLocalStorageItem } from "./LocalStorageService";

export const EMAIL_KEY = "email";
// It's insecure to save locally. Only for demo purposes
const PASSWORD_KEY = "password";

export function signIn(email: string, password: string): void {
    setLocalStorageItem(EMAIL_KEY, email);
    setLocalStorageItem(PASSWORD_KEY, password);
}

export function signOut() {
    removeLocalStorageItem(EMAIL_KEY);
    removeLocalStorageItem(PASSWORD_KEY);
}