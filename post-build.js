import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const docsDir = path.resolve('docs');

// Create .nojekyll in dist
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

// Copy dist to docs for GitHub Pages "deploy from /docs" support
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.cpSync(distDir, docsDir, { recursive: true });
console.log('Successfully synced dist to docs with .nojekyll');
