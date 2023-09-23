import datas from '../data/navLinks.json'
import NavLink from '../components/NavLink'
import checkURL from './routeService'

/**
 * Reads and returns NavLink elements for header.
 * 
 * @returns {JSX.Element[]} NavLink elements
 */
const navigationLinkDatas = () => {
  const navLinks = []

  const check = url => {
    const checked = checkURL(url, 'both')
    if (
      checked ==
      {
        expected: true,
        whoExpected: '/'
      }
    ) {
      return false
    } else {
      return checkURL(url, 'both').expected
    }
  }

  datas.forEach(data => {
    navLinks.push(
      <NavLink
        isActive={check(data.url)}
        href={data.url}
        key={data.url}
      >
        {data.name}
      </NavLink>
    )
  })

  return navLinks
}

export default navigationLinkDatas
