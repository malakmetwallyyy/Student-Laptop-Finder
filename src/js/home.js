import { getLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import { money, showError, setupHeader } from "./ui.js";

setupHeader();
const stats = document.getElementById("homeStats");
try {
  const laptops = await getLaptops();
  const lowestPrice = laptops.reduce((lowest, laptop) => Math.min(lowest, laptop.price), laptops[0].price);
  const savedCount = getFavorites().length;
  stats.innerHTML = `
    <div class="panel"><p class="muted">Total laptops</p><p class="mt-2 text-3xl font-bold">${laptops.length}</p></div>
    <div class="panel"><p class="muted">Lowest price</p><p class="mt-2 text-3xl font-bold">${money(lowestPrice)}</p></div>
    <div class="panel"><p class="muted">Saved favorites</p><p class="mt-2 text-3xl font-bold">${savedCount}</p></div>`;
} catch (error) {
  showError(document.getElementById("homeError"), "Sorry, laptop data could not be loaded. Run the website with Live Server.");
}