// Utilidad de favoritos con persistencia por usuario usando localStorage

const STORAGE_KEY_PREFIX = "favorites:";
const USER_KEY = "currentUserEmail";

function getCurrentUserKey() {
  const email = localStorage.getItem(USER_KEY);
  return email && email.trim() ? email.trim().toLowerCase() : "guest";
}

function getStorageKey() {
  return STORAGE_KEY_PREFIX + getCurrentUserKey();
}

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("No se pudieron leer favoritos:", e);
    return [];
  }
}

export function saveFavorites(favs) {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(favs));
  } catch (e) {
    console.warn("No se pudieron guardar favoritos:", e);
  }
}

export function isFavorite(bookId) {
  const favs = loadFavorites();
  return favs.some((b) => String(b.id) === String(bookId));
}

export function toggleFavorite(book) {
  const favs = loadFavorites();
  const exists = favs.some((b) => String(b.id) === String(book.id));
  let updated;
  if (exists) {
    updated = favs.filter((b) => String(b.id) !== String(book.id));
  } else {
    // Guardamos campos mínimos necesarios para mostrar en la vista
    const minimal = {
      id: book.id,
      titulo: book.titulo,
      autor: book.autor,
      genero: book.genero,
    };
    updated = [minimal, ...favs];
  }
  saveFavorites(updated);
  return updated;
}

export function removeFavorite(bookId) {
  const favs = loadFavorites();
  const updated = favs.filter((b) => String(b.id) !== String(bookId));
  saveFavorites(updated);
  return updated;
}

export function clearFavoritesForCurrentUser() {
  localStorage.removeItem(getStorageKey());
}