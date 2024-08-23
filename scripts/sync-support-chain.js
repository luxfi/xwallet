#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const path = require('path');

const child_process = require('child_process');
const targetPath = path.join(
  __dirname,
  '../src/constant/default-support-chains.json'
);

const res = child_process.execSync(
  'curl -s https://cdn.lux.network/xwallet/supported_chains.json'
);
let supported_chains_list = [];
try {
  supported_chains_list = JSON.parse(res);
} catch (err) {
  console.error('parse remote chain data failed:', err);
}

fs.writeFileSync(targetPath, res);

console.info('finished.');
