const STORAGE_KEY = "GONG";

export function setUserInfo(value) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
}
