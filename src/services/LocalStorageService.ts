// keys
const DICT = "dict";
export const EMAIL = "email";
export const FAVORITE_SONG_IDS_BY_USER = "favoriteSongIds";

type Value = string | number | boolean | Record<string, unknown>;
export function getLocalStorageItem(key: string): Value | null {
    // atob
    const encryptedDict: string | null = localStorage.getItem(DICT);
    const dict: { [field: string]: Value } = encryptedDict ? JSON.parse(atob(encryptedDict)) : {};
    return dict[key] ?? null;
}

export function setLocalStorageItem(key: string, value: Value): void {
    let encryptedDict: string | null = localStorage.getItem(DICT);
    const dict: { [field: string]: Value } = encryptedDict ? JSON.parse(atob(encryptedDict)) : {};
    dict[key] = value;
    // btoa
    encryptedDict = btoa(JSON.stringify(dict));
    localStorage.setItem(DICT, encryptedDict);
}

export function removeLocalStorageItem(key: string): void {
    let encryptedDict: string | null = localStorage.getItem(DICT);
    const dict: { [field: string]: Value } = encryptedDict ? JSON.parse(atob(encryptedDict)) : {};
    delete dict[key];
    encryptedDict = btoa(JSON.stringify(dict));
    localStorage.setItem(DICT, encryptedDict);
}
