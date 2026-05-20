const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Backgrounds
  content = content.replace(/bg-black/g, 'bg-background');
  content = content.replace(/bg-\[\#050505\]/g, 'bg-background');
  content = content.replace(/bg-\[\#080808\]/g, 'bg-card');
  content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-card');
  content = content.replace(/bg-\[\#111\]/g, 'bg-muted');

  // Text colors
  content = content.replace(/text-white\/30/g, 'text-muted-foreground/60');
  content = content.replace(/text-white\/40/g, 'text-muted-foreground/80');
  content = content.replace(/text-white\/50/g, 'text-muted-foreground');
  content = content.replace(/text-white\/60/g, 'text-muted-foreground');
  content = content.replace(/text-white\/70/g, 'text-foreground/70');
  content = content.replace(/text-white\/80/g, 'text-foreground/80');
  content = content.replace(/text-white\/90/g, 'text-foreground/90');
  // Need to be careful with text-white, want to replace only text-white, not text-white/50 (handled above)
  content = content.replace(/text-white(?!\/)/g, 'text-foreground');

  // Borders
  content = content.replace(/border-white\/5(?!\d)/g, 'border-border/50');
  content = content.replace(/border-white\/10/g, 'border-border');
  content = content.replace(/border-white\/20/g, 'border-border/80');
  content = content.replace(/border-white\/30/g, 'border-border');

  // Foreground backgrounds
  content = content.replace(/bg-white(?!\/)/g, 'bg-foreground');
  content = content.replace(/bg-white\/5(?!\d)/g, 'bg-foreground/5');
  content = content.replace(/bg-white\/10/g, 'bg-foreground/10');
  content = content.replace(/bg-white\/20/g, 'bg-foreground/20');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log("Done");
