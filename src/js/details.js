import { getLaptops } from "./api.js";
import { addFavorite, getFavorites } from "./storage.js";
import { money, setupHeader, showError } from "./ui.js";

setupHeader();
const content = document.getElementById("detailsContent");
const id = Number(new URLSearchParams(window.location.search).get("id"));

try {
  const laptops = await getLaptops();
  const laptop = laptops.find(item => item.id === id);
  if (!laptop) {
    content.innerHTML = "Laptop not found. Please return to the catalogue.";
  } else {
    const fields = [
      ["ID", laptop.id], ["Name", laptop.name], ["Brand", laptop.brand], ["Price", money(laptop.price)],
      ["Category", laptop.category], ["CPU", laptop.cpu], ["RAM", laptop.ramGB + " GB"],
      ["Storage", laptop.storageGB + " GB"], ["Battery", laptop.batteryHours + " hours"],
      ["Weight", laptop.weightKg + " kg"], ["Screen", laptop.screenInches + " inches"],
      ["Description", laptop.description]
    ];
    content.innerHTML = `
      <img src="${laptop.image}" alt="${laptop.name}" class="mb-5 h-56 w-full rounded-xl object-cover">
      <h1 class="text-3xl font-bold">${laptop.name}</h1>
      <p class="muted my-2">${laptop.description}</p>
      <h2 class="mb-3 mt-6 text-xl font-bold">Full Specifications</h2>
      <div class="overflow-x-auto"><table class="w-full text-left">
        ${fields.map(([key, value]) => `<tr class="border-b border-slate-500/30"><th class="p-3">${key}</th><td class="p-3">${value}</td></tr>`).join("")}
      </table></div>
      <div class="mt-5 flex flex-wrap gap-3">
        <button id="saveButton" class="btn-action bg-brand text-white">Add to Favorites</button>
        <a href="compare.html" class="btn-action bg-blue-600 text-white">Go to Compare</a>
        <a href="laptops.html" class="btn-action border border-current">Back to Laptops</a>
      </div>`;
    const saveButton = document.getElementById("saveButton");
    if (getFavorites().includes(id)) saveButton.textContent = "Already in Favorites";
    saveButton.addEventListener("click", () => {
      addFavorite(id);
      saveButton.textContent = "Saved to Favorites";
    });
  }
} catch (error) {
  showError(document.getElementById("detailsError"), "Could not load laptop details. Please use Live Server.");
}