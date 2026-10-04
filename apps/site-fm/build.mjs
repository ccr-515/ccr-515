import { readFileSync, writeFileSync } from 'node:fs';
const path = new URL('./public/index.html', import.meta.url);
let html = readFileSync(path, 'utf8');
if (!html.includes('src="/availability.js"')) {
  html = html.replace('</head>', '<script src="/availability.js" defer></script></head>');
  writeFileSync(path, html);
}
