const fs = require('fs');

const code = fs.readFileSync('src/scratch/wrapper_decoded.txt', 'utf8');

const mockElement = {
  relList: {
    supports: (type) => {
      console.log(`[Feature Check] supports: ${type}`);
      return true;
    }
  },
  getAttribute(name) {
    console.log(`[Element getAttribute] ${name}`);
    return '';
  },
  setAttribute(name, val) {
    console.log(`[Element setAttribute] ${name} = ${val}`);
  }
};

const makeTraceProxy = (name, target = {}) => {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop === 'createElement') {
        return (tag) => {
          console.log(`[createElement] ${tag}`);
          return mockElement;
        };
      }
      if (prop === 'querySelector' || prop === 'querySelectorAll' || prop === 'getElementsByTagName') {
        return () => [mockElement];
      }
      const val = target[prop];
      console.log(`[Proxy Get] ${name}.${String(prop)} -> type: ${typeof val}`);
      if (val === undefined) {
        return () => makeTraceProxy(`${name}.${String(prop)}()`);
      }
      return val;
    }
  });
};

const mockWindow = makeTraceProxy('window');
const mockDocument = makeTraceProxy('document', {
  head: makeTraceProxy('document.head'),
  body: makeTraceProxy('document.body'),
});

global.window = mockWindow;
global.document = mockDocument;
global.MutationObserver = class {
  observe() {}
  disconnect() {}
};

// Intercept fetch
global.fetch = async (url, options) => {
  console.log('\n====================================');
  console.log('SUCCESS! Intercepted Fetch Call:');
  console.log('URL:', url);
  console.log('Options:', JSON.stringify(options, null, 2));
  console.log('====================================\n');
  return {
    ok: true,
    json: async () => ({}),
    text: async () => ''
  };
};

console.log('Running script...');
try {
  eval(code);
} catch (e) {
  console.log('Script execution finished or interrupted:', e.message);
}
