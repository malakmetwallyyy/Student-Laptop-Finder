// Read saved favorites from localStorage.
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Save favorites so they stay after reloading.
export function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function addFavorite(id) {
  const favorites = getFavorites();
  if (!favorites.includes(Number(id))) {
    favorites.push(Number(id));
  }
  saveFavorites(favorites);
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(item => item !== Number(id));
  saveFavorites(favorites);
}

export function getTheme() {
  return localStorage.getItem("theme") || "saver";
}

export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}