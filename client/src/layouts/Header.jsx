import { AlignLeft } from 'react-feather'
import navigationLinkDatas from '../services/navLinkService'

const clickEvent = () => {
  const navbar = document.querySelector('.navbar')
  navbar.classList.toggle('navbar-opened-mobile')
  document.body.style.overflow === 'hidden'
    ? (document.body.style.overflow = '')
    : (document.body.style.overflow = 'hidden')
}
const Header = () => {
  return (
    <header className='h-16 w-full border-gray-200 border-b flex flex-row items-center justify-between px-4'>
      <a
        href='/'
        className='flex flex-row'
      >
        <img
          className='rounded-full w-[50px] h-[50px]'
          src='/foto.png'
        />
      </a>
      <div
        className='md:hidden cursor-pointer'
        onClick={clickEvent}
      >
        <AlignLeft />
      </div>
      <div className='navbar hidden md:flex md:flex-row md:gap-x-14 md:items-center md:justify-between'>
        {navigationLinkDatas().map(navLink => navLink)}
      </div>
    </header>
  )
}

export default Header
