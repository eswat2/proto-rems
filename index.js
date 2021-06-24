const base = {
  tag: 0.5,
  rem: 0.125,
  px: 2,
}

const skip = []

/**
 * getSizes
 * Handles getting sizes in rem...
 * @param {int} stop
 * @param {int} start
 * @return {object}
 */
const getSizes = (stop = 900, start = 0) => {
  // The following generates an array of increasing values from the totalSizes above.
  const sizeArray = Array.from(Array((stop * 2) + 1).keys())
  const sliced = sizeArray.slice((start * 2), sizeArray.length)
  console.log('-- sliced: ', sliced.length, sliced)
  const sizes = []

  sliced.forEach((x) => {
    const { tag, rem, px } = base
    const size = x * tag
    const rems = x * rem
    const pixels = x * px
    if (!skip.includes(size)) {
      sizes.push({ size, rems, pixels })
    }
  })

  console.table(sizes, ['size', 'rems', 'pixels'])
}

getSizes(80, 70)
