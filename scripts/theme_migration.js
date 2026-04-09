const fs = require('fs');
const path = require('path');

function replaceColors(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        replaceColors(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Global Brand Replacements
      // Primary: #1b3b36 -> #d4af37
      // Hover: #132a26   -> #b8860b
      // Dark Base (Admin/Nav): #0f2520 -> #0a0a0a (black)
      // Dark Mid: #142e29     -> #141414 (dark grey)
      
      let newContent = content
        .replace(/#1b3b36/gi, '#d4af37') // Primary green -> Gold
        .replace(/#132a26/gi, '#b8860b') // Hover dark green -> Dark Gold
        .replace(/#0f2520/gi, '#0a0a0a') // Main dark grey/green -> Black
        .replace(/#142e29/gi, '#141414'); // Mid dark grey/green -> Dark grey
        
      // Ensure text contrast on Gold backgrounds:
      // Previously, white text on dark green was fine: `text-white bg-[#1b3b36]`
      // Now, white text on gold `text-white bg-[#d4af37]` can be hard to read.
      // Need to replace `text-white` with `text-black` if it's explicitly paired with gold.
      // E.g., `text-white bg-[#d4af37]` -> `text-black bg-[#d4af37]`
      newContent = newContent.replace(/text-white(\s+)bg-\[#d4af37\]/gi, 'text-black$1bg-[#d4af37]');
      newContent = newContent.replace(/bg-\[#d4af37\](\s+)text-white/gi, 'bg-[#d4af37]$1text-black');
      
      newContent = newContent.replace(/hover:text-white(\s+)hover:bg-\[#b8860b\]/gi, 'hover:text-black$1hover:bg-[#b8860b]');
      newContent = newContent.replace(/hover:bg-\[#b8860b\](\s+)hover:text-white/gi, 'hover:bg-[#b8860b]$1hover:text-black');
      
      // DynamicVehicleGrid specific buttons
      newContent = newContent.replace(/bg-\[#d4af37\] text-white hover:bg-\[#b8860b\]/gi, 'bg-[#d4af37] text-black hover:bg-[#b8860b]');
      newContent = newContent.replace(/hover:bg-\[#d4af37\] hover:text-white/gi, 'hover:bg-[#d4af37] hover:text-black');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceColors(__dirname);
