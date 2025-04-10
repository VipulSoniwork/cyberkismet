/**
 * Script to generate/update app assets
 * 
 * This script creates placeholder assets for development purposes.
 * In a production environment, these should be replaced with proper design assets.
 */

const fs = require('fs');
const path = require('path');

// Ensure directories exist
const scriptDir = __dirname;
const rootDir = path.resolve(scriptDir, '..');
const assetDir = path.join(rootDir, 'assets');

if (!fs.existsSync(assetDir)) {
  fs.mkdirSync(assetDir, { recursive: true });
  console.log(`Created assets directory at ${assetDir}`);
}

// Simple 1x1 pixel PNG (pink color matching our primary brand color)
const primaryColorPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
  'base64'
);

// Simple icon PNG (64x64 with app initials)
const iconPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpSIVBTuIOGSoThZERRy1CkWoEGqFVh1MbvqhNGlIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0DhGaVqWbPOKBqlpFOxMVcflUMvCKAEYQxIjJTT2YWs/AcX/fw8fUuyrO8z/05BpWCyQCfSDzHdMMi3iCe2bR0zvvEEVaSFPE58YRBFyR+5Lrs8hvnosMAz4yY6Yw88QixWO5iuYvZrDkjnhOHhdJQiZ8rjqu0B5b9HOuaEtnUPOGI40ltKNUxGzHUoY5KNU9mRlqcpdEod2PUvsMvNCWXXKdcxRiQ5ZJOExlJIT2KqOAGBNvV6A9iudBMPvmuU6w5zpOHMaJcA0GrDjTtB/83v9Oare/TIjcucnrRxYAXO0CrzpG6A4FdoN0wjK/qeH3PcfoBkCdDV6x+zQKMfEnfrldMwMgT0N/VcXMdEFoC0t+8w7uc7E0JJL+kiv0DQHB+jI2WOdADAdrliuffmRtrncA/D2a/nm71H5okcoL9Qk0FAAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+cJJhMTJMKu8rkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAARElEQVRo3u3NQREAAAQAMCBc/nuiOXoYK21KlXDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuPD/sQOUjQ304rjPHAAAAABJRU5ErkJggg==',
  'base64'
);

// Simple splash PNG (centered app name on brand color)
const splashPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAYASURBVHja7NlBDQAhEMXA8acLBWjFUwfh0Bny3BG7+8UADuUCQNABEHQABB0AQQdA0AEQdAAEHUDQARB0AAQdAEEHQNABEHQABB1A0AEQdAAEHQBBB0DQARB0AAQdQNABEHQABB0AQQdA0AEQdAAEHUDQARB0AAQdAEEHQNABEHQABB1A0AEQdAAEHQBBB0DQARB0AAQdQNABEHQABB0AQQdA0AEQdAAEHUDQARB0AAQdAEEHQNABEHQABB1A0AEQdAAEHQBBB0DQARB0AA4n6ACCDoCgAyDoAAg6AIIOgKADCDoAgg6AoAMg6AAIOgCCDoCgAwg6AIIOgKADIOgACDoAgg6AoAMIOgCCDoCgAyDoAAg6AIIOgKADCDoAgg6AoAMg6AAIOgCCDoCgAwg6AIIOgKADIOgACDoAgg6AoAMIOgCCDoCgAyDoAAg6AIIOgKADCLoLAEEHQNABEHQABB0AQQdA0AEEHQBBByDUDEDQARB0AAQdAEEHQNABEHQAQQdA0AEQdAAEHQBBB0DQARB0AEEHQNABEHQANu0AwN4AoXkHd8EAAAAASUVORK5CYII=',
  'base64'
);

// Asset definitions with their respective data
const assets = [
  { name: 'icon.png', data: iconPng },
  { name: 'splash.png', data: splashPng },
  { name: 'adaptive-icon.png', data: iconPng },
  { name: 'favicon.png', data: iconPng }
];

// Create all required asset files
assets.forEach(asset => {
  const filePath = path.join(assetDir, asset.name);
  fs.writeFileSync(filePath, asset.data);
  console.log(`Created/Updated ${filePath}`);
});

console.log('\nAll assets created/updated successfully!');
console.log('\nNext steps:');
console.log('1. Replace these placeholder assets with proper design assets');
console.log('2. Ensure icon.png is at least 1024x1024 pixels');
console.log('3. Ensure splash.png is at least 1242x2436 pixels\n'); 