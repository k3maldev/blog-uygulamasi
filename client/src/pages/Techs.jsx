import LeftText from '../components/LeftText'
import techDatas from '../services/techService'

/**
 * Techs.
 *
 * @returns {JSX.Element} Page
 */
const Techs = () => {
  return (
    <div className='flex flex-col p-8 gap-y-4'>
      <LeftText>Kullandığım Teknolojiler</LeftText>
      <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {techDatas().length !== 0 ? (
          techDatas().map(project => project)
        ) : (
          <p className='text-gray-600'>Burası bomboş...</p>
        )}
      </div>
    </div>
  )
}

export default Techs
