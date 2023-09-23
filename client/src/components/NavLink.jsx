/* eslint-disable react/prop-types */
const NavLink = ({ isActive, children, href }) => {
  return (
    <a
      href={href}
      className={`py-2 px-4 hover:bg-blue-300/20 rounded-lg cursor-pointer ${
        isActive ? 'active' : ''
      }`}
    >
      {children}
    </a>
  )
}

export default NavLink
