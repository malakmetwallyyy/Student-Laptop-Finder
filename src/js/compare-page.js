import { getLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import { makeComparisonRows } from "./compare.js";
import { setupHeader, showError } from "./ui.js";

setupHeader();
const choices = document.getElementById("compareChoices");
const message = document.getElementById("compareMessage");
const table = document.getElementById("comparisonTable");

try {
  const laptops = await getLaptops();
  const favorites = laptops.filter(laptop => getFavorites().includes(laptop.id));
  if (favorites.length < 2) {
    choices.textContent = "Save at least two laptops to compare them.";
  } else {
    choices.innerHTML = favorites.map((laptop, index) => `
      <label class="mr-4 inline-flex items-center gap-2 p-2">
        <input type="checkbox" class="compare-check" value="${laptop.id}" ${index < 2 ? "checked" : ""}>
        ${laptop.name}
      </label>`).join("");
  }

  function renderComparison() {
    const selectedIds = Array.from(document.querySelectorAll(".compare-check:checked")).map(input => Number(input.value));
    if (selectedIds.length > 4) {
      message.textContent = "You can compare a maximum of four laptops.";
      return;
    }
    if (selectedIds.length < 2) {
      message.textContent = "Please select at least two laptops.";
      table.innerHTML = "";
      return;
    }
    message.textContent = "";
    const selected = favorites.filter(laptop => selectedIds.includes(laptop.id));
    table.innerHTML = `<thead><tr><th class="p-3">Specification</th>${selected.map(laptop => `<th class="p-3">${laptop.name}</th>`).join("")}</tr></thead>
      <tbody>${makeComparisonRows(selected)}</tbody>`;
  }

  document.querySelectorAll(".compare-check").forEach(input => input.addEventListener("change", () => {
    const checked = document.querySelectorAll(".compare-check:checked");
    if (checked.length > 4) {
      input.checked = false;
      message.textContent = "You can compare a maximum of four laptops.";
    } else {
      renderComparison();
    }
  }));
  renderComparison();
} catch (error) {
  showError(document.getElementById("compareMessage"), "Could not load comparison. Please use Live Server.");
}