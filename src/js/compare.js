export function getBestValue(laptops, field, lowest) {
  const values = laptops.map(laptop => Number(laptop[field]));
  return lowest ? Math.min(...values) : Math.max(...values);
}

export function makeComparisonRows(laptops) {
  const rows = [
    ["Price", "price", true],
    ["CPU", "cpu", null],
    ["RAM (GB)", "ramGB", false],
    ["Storage (GB)", "storageGB", false],
    ["Battery (hours)", "batteryHours", false],
    ["Weight (kg)", "weightKg", true],
    ["Screen (inches)", "screenInches", null],
    ["Category", "category", null]
  ];

  return rows.map(([label, field, lowest]) => {
    const best = lowest === null ? null : getBestValue(laptops, field, lowest);
    return `<tr>
      <th class="p-3 text-left">${label}</th>
      ${laptops.map(laptop => {
        const value = laptop[field];
        const isBest = best !== null && Number(value) === best;
        return `<td class="p-3 ${isBest ? "bg-green-200 font-bold text-green-900" : ""}">${value}</td>`;
      }).join("")}
    </tr>`;
  }).join("");
}