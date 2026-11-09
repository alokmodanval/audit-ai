import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Compiling Cloudflare Pages functions into dist/_worker.js...');

try {
  execSync('npx wrangler pages functions build --outdir=dist', { stdio: 'inherit' });
} catch (e) {
  // Fallback to local node_modules if npx fails
  const localWrangler = path.resolve('../Tools4Genz/node_modules/wrangler/bin/wrangler.js');
  if (fs.existsSync(localWrangler)) {
    execSync(`node "${localWrangler}" pages functions build --outdir=dist`, { stdio: 'inherit' });
  } else {
    throw e;
  }
}

const generatedFile = path.resolve('dist/index.js');
const targetWorker = path.resolve('dist/_worker.js');

if (fs.existsSync(generatedFile)) {
  fs.renameSync(generatedFile, targetWorker);
  console.log('Successfully bundled functions to dist/_worker.js');
} else if (fs.existsSync(targetWorker)) {
  console.log('dist/_worker.js already in place');
} else {
  console.warn('Warning: Could not find compiled worker file');
}
