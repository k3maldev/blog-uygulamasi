import datas from '../data/techs.json'
import ProjectBox from '../components/ProjectBox'

const techDatas = () => {
  const techs = []

  datas.forEach(data => {
    techs.push(
      <ProjectBox
        title={data.name}
        shortDescription={data.description}
        key={data.url}
      >
        {data.name}
      </ProjectBox>
    )
  })

  return techs
}

export default techDatas
