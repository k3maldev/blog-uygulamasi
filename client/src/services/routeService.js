const routePathname = window.location.pathname.replace('/', '')
const routeHash = window.location.hash.replace('#', '')

/**
 * A function that checks whether the URL is as desired. Can be used only for pathname, hash, or both. Returns `true` or `false`.
 *
 * @param {'pathname' | 'hash' | 'both'} request - Requested data
 * @param {string} expected - Expected Data
 *
 * @returns {boolean | object} Is the url as requested?
 *
 * ! If you are using 'both' or pathname is '/' this function returns an object like:
 * ```json
 * {
 *   "expected": true,
 *   "whoExpected": "path"
 * }
 * ```
 */
const checkURL = (expected, request) => {
  if (
    typeof expected !== 'string' ||
    (request !== 'pathname' &&
      request !== 'hash' &&
      request !== 'both')
  ) {
    throw new ReferenceError('routeService.js unexpected value')
  }

  if (routePathname === '/') {
    return {
      expected: true,
      whoExpected: '/'
    }
  }

  switch (request) {
    case 'pathname':
      if (routePathname === expected) {
        return true
      } else {
        return false
      }

    case 'hash':
      if (routeHash === expected) {
        return true
      } else {
        return false
      }

    case 'both':
      if (routePathname === expected || routeHash === expected) {
        return {
          expected: true,
          whoExpected: routePathname === expected ? 'path' : 'hash'
        }
      } else {
        return {
          expected: false,
          whoExpected: null
        }
      }

    default:
      break
  }
}

export default checkURL

export { routeHash, routePathname }
