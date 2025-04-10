const fs = require("fs");
const path = require("path");

// Create a simple 1x1 pixel PNG
const minimal_png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");

// Ensure assets directory exists
const assetDir = path.join(__dirname, "assets");
if (!fs.existsSync(assetDir)) {
  fs.mkdirSync(assetDir, { recursive: true });
}

// Create all required asset files
const assets = ["icon.png", "splash.png", "adaptive-icon.png", "favicon.png"];

assets.forEach(asset => {
  const filePath = path.join(assetDir, asset);
  fs.writeFileSync(filePath, minimal_png);
  console.log(`Created ${filePath}`);
});

console.log("All assets created successfully!"); 