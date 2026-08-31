const fs = require('fs');
const code = fs.readFileSync('src/scratch/wrapper_decoded.txt', 'utf8');

// --- DECODE ARRAY I ---
const I_match = code.match(/function I\(\)\{const t=(\[.*?\]);/);
const I_arr = eval(I_match[1]);

const z = (t) => {
  const idx = t - 241;
  const s = I_arr[idx];
  if (!s) return '';
  return Buffer.from(s, 'base64').toString('utf8');
};

const shiftI = code.match(/\(function\(t,n\)\{const e=p,f=t\(\);for\(;;\)try\{if\((.*?)\===n\)break;f\.push\(f\.shift\(\)\)\}catch\{f\.push\(f\.shift\(\)\)\}\}\)\(I,(\d+)\)/) 
               || code.match(/\(function\(t,n\)\{const e=z,f=t\(\);for\(;;\)try\{if\((.*?)\===n\)break;f\.push\(f\.shift\(\)\)\}catch\{f\.push\(f\.shift\(\)\)\}\}\)\(I,(\d+)\)/);
const exprI = shiftI[1];
const targetI = parseInt(shiftI[2]);

let stepsI = 0;
while(true) {
  try {
    const evalExpr = exprI.replace(/e\((\d+)\)/g, (m, g) => {
      const val = z(parseInt(g));
      const num = parseInt(val);
      return isNaN(num) ? 0 : num;
    });
    if (eval(evalExpr) === targetI) {
      console.log('Decrypted I-array shifted successfully in steps:', stepsI);
      break;
    }
  } catch(e) {}
  I_arr.push(I_arr.shift());
  stepsI++;
  if(stepsI > 2000) break;
}

console.log('\n--- Decoded I-array Strings (z) ---');
for (let i = 241; i < 241 + I_arr.length; i++) {
  try {
    console.log(`z(${i}): "${z(i)}"`);
  } catch(e) {}
}


// --- DECODE ARRAY E ---
const E_match = code.match(/function E\(\)\{const t=(\[.*?\]);/);
const E_arr = eval(E_match[1]);

const p = (t) => {
  const idx = t - 195;
  const s = E_arr[idx];
  if (!s) return '';
  return Buffer.from(s, 'base64').toString('utf8');
};

const shiftE = code.match(/\(function\(t,n\)\{const e=p,f=t\(\);for\(;;\)try\{if\((.*?)\===n\)break;f\.push\(f\.shift\(\)\)\}catch\{f\.push\(f\.shift\(\)\)\}\}\)\(E,(\d+)\)/)
               || code.match(/\(function\(t,n\)\{const e=z,f=t\(\);for\(;;\)try\{if\((.*?)\===n\)break;f\.push\(f\.shift\(\)\)\}catch\{f\.push\(f\.shift\(\)\)\}\}\)\(E,(\d+)\)/);
const exprE = shiftE[1];
const targetE = parseInt(shiftE[2]);

let stepsE = 0;
while(true) {
  try {
    const evalExpr = exprE.replace(/e\((\d+)\)/g, (m, g) => {
      const val = p(parseInt(g));
      const num = parseInt(val);
      return isNaN(num) ? 0 : num;
    });
    if (eval(evalExpr) === targetE) {
      console.log('Decrypted E-array shifted successfully in steps:', stepsE);
      break;
    }
  } catch(e) {}
  E_arr.push(E_arr.shift());
  stepsE++;
  if(stepsE > 2000) break;
}

console.log('\n--- Decoded E-array Strings (p) ---');
for (let i = 195; i < 195 + E_arr.length; i++) {
  try {
    console.log(`p(${i}): "${p(i)}"`);
  } catch(e) {}
}
