import datas from '../data/projects.json'
import ProjectBox from '../components/ProjectBox'

const projectDatas = () => {
  const projects = []

  datas.forEach(data => {
    projects.push(
      <ProjectBox
        href={data.url}
        title={data.name}
        shortDescription={data.description}
        key={data.url}
      >
        {data.name}
      </ProjectBox>
    )
  })

  return projects
}

export default projectDatas
