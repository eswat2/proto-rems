var { argv } = require('yargs')
  .scriptName('rems')
  .usage('Usage: $0 [--start num] [--stop num] [-h] [-e] [-p]')
  .option('x', {
    alias: 'start',
    describe: 'Start Value',
    default: 0,
    number: true,
    nargs: 1,
  })
  .option('z', {
    alias: 'stop',
    describe: 'Stop Value',
    default: 100,
    number: true,
    nargs: 1,
  })
  .option('h', {
    alias: 'halves',
    describe: 'Enable Halves',
    default: false,
    boolean: true,
    nargs: 0,
  })
  .option('s', {
    alias: 'single',
    describe: 'Single Value',
    default: false,
    boolean: true,
    nargs: 0,
  })
  .option('e', {
    alias: 'export',
    describe: 'Export as Config',
    default: false,
    boolean: true,
    nargs: 0,
  })
  .option('p', {
    alias: 'pixels',
    describe: 'Export Pixels',
    default: false,
    boolean: true,
    nargs: 0,
  })
  .option('d', {
    alias: 'debug',
    describe: 'Debug output',
    default: false,
    boolean: true,
    nargs: 0,
  })
  .describe('help', 'Show help...')
  .describe('version', '0.0.1')
  .epilog('copyright 2021');

const base = {
  tag: 0.5,
  rem: 0.125,
  px: 2,
};

const debug = false;
const markdown = argv.export || argv.pixels ? false : true;
const skip = [];

/**
 * getSizes
 * Handles getting sizes in rem...
 * @param {int} stop
 * @param {int} start
 * @return {object}
 */
const getSizes = (stop = 100, start = 0, halves = false) => {
  // The following generates an array of increasing values from the totalSizes above.
  const sizeArray = Array.from(Array(stop * (halves ? 2 : 1) + 1).keys());
  const sliced = sizeArray.slice(start * (halves ? 2 : 1), sizeArray.length);
  debug && console.log('-- sliced: ', sliced.length, sliced);
  const sizes = [];

  sliced.forEach(x => {
    const { tag, rem, px } = base;
    const size = x * tag * (halves ? 1 : 2);
    const rems = x * rem * (halves ? 1 : 2);
    const pixels = x * px * (halves ? 1 : 2);
    if (!skip.includes(size)) {
      sizes.push({ size, rems, pixels });
    }
  });

  if (argv.debug) {
    console.table(sizes, ['size', 'rems', 'pixels']);
  } else {
    if (markdown) {
      console.log('# Tailwind spacing scale:');
      console.log('');
      console.log(
        `range: ${start}-${stop} ${halves ? 'including half scale...' : ''}`,
      );
      console.log('');
      console.log('| name | rems | pixels |');
      console.log('| :--- | :--- | ---: |');

      sizes.forEach(({ size, rems, pixels }) => {
        console.log(`| ${size} | ${rems} | ${pixels} |`);
      });
    } else {
      console.log('theme: {');
      console.log('  extend: {');
      console.log('    spacing: {');
      sizes.forEach(({ size, rems, pixels }) => {
        const safe = size.toString().replace('.', 'p');
        if (argv.pixels) {
          console.log(`      "${safe}": "${pixels}px",`);
        } else {
          console.log(`      "${safe}": "${rems}rem",`);
        }
      });
      console.log('    }');
      console.log('  }');
      console.log('},');
    }
  }
};

const isFractional = (flag, start, stop) => {
  return flag || !Number.isInteger(start) || !Number.isInteger(stop)
}

if (argv.single) {
  const value = argv.start || argv.stop;
  getSizes(value, value, isFractional(argv.halves, value, value));
} else {
  getSizes(argv.stop, argv.start, isFractional(argv.halves, argv.start, argv.stop));
}
