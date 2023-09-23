import LeftText from '../components/LeftText'
import projectDatas from '../services/projectService'

/**
 * Projects.
 *
 * @returns {JSX.Element} Page
 */
const Projects = () => {
  return (
    <div className='flex flex-col p-8 gap-y-4'>
      <LeftText>Projelerim</LeftText>
      <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {projectDatas().length !== 0 ? (
          projectDatas().map(project => project)
        ) : (
          <p className='text-gray-600'>Burası bomboş...</p>
        )}
      </div>
    </div>
  )
}

export default Projects
