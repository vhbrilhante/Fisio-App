const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  // Substitui links que começam com /_next por ./_next
  // Também lida com /favicon.ico e outros recursos na raiz
  const updated = content
    .replace(/href="\//g, 'href="./')
    .replace(/src="\//g, 'src="./')
    .replace(/=\"\/_next/g, '="./_next')
    .replace(/:"\/_next/g, ':"./_next') // JSON paths
    .replace(/,\"\/_next/g, ',"./_next') // Array paths
    .replace(/HL\["\/_next/g, 'HL["./_next')
    .replace(/url\(\/\_next/g, 'url(\.\/\_next'); // CSS url() paths
    
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`Fixado: ${filePath}`);
}

const outDir = path.join(__dirname, '../out');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  });
}

if (fs.existsSync(outDir)) {
  walk(outDir);
  console.log('Relativização concluída com sucesso.');
} else {
  console.error('Pasta out/ não encontrada.');
}
