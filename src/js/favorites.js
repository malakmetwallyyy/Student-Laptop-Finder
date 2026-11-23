import { getLaptops } from "./api.js";
import { getFavorites, removeFavorite, saveFavorites } from "./storage.js";
import { money, renderLaptopCard, connectFavoriteButtons, setupHeader, showError } from "./ui.js";

setupHeader();
const list = document.getElementById("favoriteList");
const stats = document.getElementById("favoriteStats");

try {
  const laptops = await getLaptops();
  function render() {
    const favorites = laptops.filter(laptop => getFavorites().includes(laptop.id));
    const total = favorites.reduce((sum, laptop) => sum + laptop.price, 0);
    const average = favorites.length ? total / favorites.length : 0;
    stats.innerHTML = `Saved: <b>${favorites.length}</b> · Total price: <b>${money(total)}</b> · Average price: <b>${money(average.toFixed(2))}</b>`;
    list.innerHTML = favorites.length ? favorites.map(renderLaptopCard).join("") : `<p class="panel">You have no saved favorites yet.</p>`;
    connectFavoriteButtons(list, render);
  }
  render();

  document.getElementById("clearFavorites").addEventListener("click", () => {
    saveFavorites([]);
    render();
  });
} catch (error) {
  showError(document.getElementById("favoriteMessage"), "Could not load favorites. Please use Live Server.");
}