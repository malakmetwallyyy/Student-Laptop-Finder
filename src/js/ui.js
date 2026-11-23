import { getFavorites, addFavorite, removeFavorite, getTheme, saveTheme } from "./storage.js";

export const money = price => "$" + Number(price).toLocaleString();

export function showError(element, message) {
  element.innerHTML = `<p class="panel text-red-500">${message}</p>`;
}

export function showSkeleton(element) {
  element.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    element.innerHTML += `<div class="laptop-card animate-pulse space-y-3">
      <div class="h-36 rounded-lg bg-slate-400/30"></div>
      <div class="h-5 w-3/4 rounded bg-slate-400/30"></div>
      <div class="h-4 w-1/2 rounded bg-slate-400/30"></div>
      <div class="h-8 rounded bg-slate-400/30"></div>
    </div>`;
  }
}

// The same card function is used on the catalogue and favorites pages.
export function renderLaptopCard(laptop) {
  const saved = getFavorites().includes(laptop.id);
  return `<article class="laptop-card">
    <img src="${laptop.image}" alt="${laptop.name}" class="h-40 w-full rounded-lg object-cover">
    <h3 class="mt-3 text-lg font-bold">${laptop.name}</h3>
    <p class="muted">${laptop.brand} · ${laptop.category}</p>
    <p class="mt-2 text-xl font-bold">${money(laptop.price)}</p>
    <p class="muted text-sm">${laptop.cpu} · ${laptop.ramGB}GB RAM · ${laptop.storageGB}GB SSD</p>
    <div class="mt-4 flex flex-wrap gap-2">
      <a class="btn-action bg-blue-600 text-white" href="details.html?id=${laptop.id}">Details</a>
      <button class="btn-action favorite-button bg-brand text-white" data-id="${laptop.id}">
        ${saved ? "♥ Saved" : "♡ Favorite"}
      </button>
    </div>
  </article>`;
}

export function connectFavoriteButtons(container, refresh) {
  container.querySelectorAll(".favorite-button").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      if (getFavorites().includes(id)) {
        removeFavorite(id);
      } else {
        addFavorite(id);
      }
      refresh();
    });
  });
}

export function setupHeader() {
  const body = document.body;
  const applyTheme = () => {
    body.classList.remove("performance", "saver");
    body.classList.add(getTheme());
    const button = document.getElementById("themeButton");
    if (button) button.textContent =
  getTheme() === "saver"
    ? "Dark Theme"
    : "Light Theme";
  };
  applyTheme();

  const themeButton = document.getElementById("themeButton");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      saveTheme(getTheme() === "saver" ? "performance" : "saver");
      applyTheme();
    });
  }

  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("mainNav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => nav.classList.toggle("hidden"));
  }
}