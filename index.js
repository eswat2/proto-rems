var { argv } = require('yargs')
  .scriptName('rems')
  .usage('Usage: $0 -z num -x num -h')
  .option('z', {
    alias: 'stop',
    describe: 'Stop Value',
    default: 100,
    type: 'number',
    nargs: 1,
  })
  .option('x', {
    alias: 'start',
    describe: 'Start Value',
    default: 0,
    type: 'number',
    nargs: 1,
  })
  .option('h', {
    alias: 'halves',
    describe: 'Enable Halves',
    default: false,
    type: 'boolean',
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
const markdown = true;
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

  //
  if (markdown) {
    console.log('# Tailwind spacing scale:');
    console.log('');
    console.log(
      `range: ${start}-${stop} ${halves ? 'including half scale...' : ''}`,
    );
    console.log('');
    console.log('| size | rems | pixels |');
    console.log('| :--- | :--- | ---: |');

    sizes.forEach(({ size, rems, pixels }) => {
      console.log(`| ${size} | ${rems} | ${pixels} |`);
    });
  } else {
    console.table(sizes, ['size', 'rems', 'pixels']);
  }
};

getSizes(argv.stop, argv.start, argv.halves);
