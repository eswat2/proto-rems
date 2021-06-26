var { argv } = require('yargs')
  .scriptName('px2tw')
  .usage('Usage: $0 [--start num] [--stop num] [-e]')
  .option('x', {
    alias: 'start',
    describe: 'Start Value (px)',
    default: 0,
    number: true,
    nargs: 1,
  })
  .option('z', {
    alias: 'stop',
    describe: 'Stop Value (px)',
    default: 100,
    number: true,
    nargs: 1,
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
const markdown = argv.export ? false : true;

/**
 * getSizes
 * Handles getting sizes in rem...
 * @param {int} stop
 * @param {int} start
 * @return {object}
 */
const getSizes = (stop = 100, start = 0) => {
  // The following generates an array of increasing values from the totalSizes above.
  const sizeArray = Array.from(Array(stop + 1).keys());
  const sliced = sizeArray.slice(start, sizeArray.length);
  debug && console.log('-- sliced: ', sliced.length, sliced);
  const sizes = [];

  sliced.forEach(x => {
    const { tag, rem, px } = base;
    const size = (x / px) * tag;
    const rems = size * (2 * rem);
    const pixels = x;
    sizes.push({ size, rems, pixels });
  });

  if (argv.debug) {
    console.table(sizes, ['size', 'rems', 'pixels']);
  } else {
    if (markdown) {
      console.log('# Tailwind spacing scale:');
      console.log('');
      console.log(`range: ${start}px-${stop}px`);
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
        console.log(`      "${safe}": "${pixels}px",`);
      });
      console.log('    }');
      console.log('  }');
      console.log('},');
    }
  }
};

if (argv.single) {
  const value = argv.start || argv.stop;
  getSizes(value, value);
} else {
  getSizes(argv.stop, argv.start);
}
