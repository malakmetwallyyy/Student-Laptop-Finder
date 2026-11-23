import { getLaptops } from "./api.js";
import { renderLaptopCard, connectFavoriteButtons, showSkeleton, showError, setupHeader } from "./ui.js";

setupHeader();
const list = document.getElementById("laptopList");
const count = document.getElementById("resultCount");
const search = document.getElementById("searchInput");
const category = document.getElementById("categoryFilter");
const maxPrice = document.getElementById("maxPrice");
const minRam = document.getElementById("minRam");
const sort = document.getElementById("sortSelect");
let laptops = [];

function render() {
  let results = laptops.filter(laptop => {
    const searchText = search.value.toLowerCase();
    return (laptop.name.toLowerCase().includes(searchText) || laptop.brand.toLowerCase().includes(searchText))
      && (!category.value || laptop.category === category.value)
      && (!maxPrice.value || laptop.price <= Number(maxPrice.value))
      && (!minRam.value || laptop.ramGB >= Number(minRam.value));
  });

  if (sort.value) {
    const [field, direction] = sort.value.split("-");
    results = [...results].sort((a, b) => direction === "asc" ? a[field] - b[field] : b[field] - a[field]);
  }

  count.textContent = `${results.length} laptop(s) found`;
  list.innerHTML = results.length ? results.map(renderLaptopCard).join("") : `<p class="panel">No laptops match your search.</p>`;
  connectFavoriteButtons(list, render);
}

showSkeleton(list);
try {
  laptops = await getLaptops();
  render();
  [search, category, maxPrice, minRam, sort].forEach(input => input.addEventListener("input", render));
} catch (error) {
  showError(document.getElementById("laptopError"), "Could not load laptops. Please use VS Code Live Server.");
}