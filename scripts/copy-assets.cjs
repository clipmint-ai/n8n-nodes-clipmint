/* Copy non-TS assets (icons) into dist so n8n can load icon: 'file:clipmint.svg' */
const fs = require("fs");
const path = require("path");

function copyFileSync(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${src} -> ${dest}`);
}

function copyIcons() {
  // Add more icons here if you have more nodes later
  const filesToCopy = [
    {
      src: path.join(__dirname, "..", "nodes", "ClipMint", "clipmint.svg"),
      dest: path.join(__dirname, "..", "dist", "nodes", "ClipMint", "clipmint.svg"),
    },
  ];

  for (const f of filesToCopy) {
    if (!fs.existsSync(f.src)) {
      console.warn(`WARN: Missing asset: ${f.src}`);
      continue;
    }
    copyFileSync(f.src, f.dest);
  }
}

copyIcons();
