const axios = require("axios");
const cheerio = require("cheerio");

async function decodeSecretMessage(url) {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      console.error("Failed to retrieve the document.");
      return;
    }

    const $ = cheerio.load(response.data);
    const rows = $("tr");
    const positions = [];

    rows.each((index, row) => {
      if (index === 0) return;
      const cols = $(row).find("td");
      if (cols.length >= 3) {
        const x = parseInt($(cols[0]).text().trim(), 10);
        const char = $(cols[1]).text().trim();
        const y = parseInt($(cols[2]).text().trim(), 10);
        positions.push({ char, x, y });
      }
    });

    if (positions.length === 0) {
      console.error("No valid data found in the document.");
      return;
    }

    const maxX = Math.max(...positions.map((pos) => pos.x));
    const maxY = Math.max(...positions.map((pos) => pos.y));

    const grid = Array.from({ length: maxY + 1 }, () =>
      Array(maxX + 1).fill(" ")
    );

    positions.forEach(({ char, x, y }) => {
      grid[y][x] = char;
    });

    const reversedGrid = grid.reverse(); // Reverse the order of the rows

    reversedGrid.forEach((row) => console.log(row.join("")));
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

const url =
  "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub"; // Replace with actual Google Doc URL
decodeSecretMessage(url);
