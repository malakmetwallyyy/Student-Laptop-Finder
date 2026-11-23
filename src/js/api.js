// Load laptop data from the JSON file.
export async function getLaptops() {
  try {
    const response = await fetch("./data/laptops.json");
    if (!response.ok) {
      throw new Error("Could not load laptop data.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}