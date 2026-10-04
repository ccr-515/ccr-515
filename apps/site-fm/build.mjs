import { readFileSync, writeFileSync } from 'node:fs';
const path = new URL('./public/index.html', import.meta.url);
let html = readFileSync(path, 'utf8');
if (!html.includes('href="/simple.css"')) {
  html = html.replace('<link rel="stylesheet" href="/style.css">', '<link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/simple.css">');
}
if (!html.includes('src="/availability.js"')) {
  html = html.replace('</head>', '<script src="/availability.js" defer></script></head>');
}
if (!html.includes('src="/monetize.js"')) {
  html = html.replace('</head>', '<script src="/monetize.js" defer></script></head>');
}
writeFileSync(path, html);
