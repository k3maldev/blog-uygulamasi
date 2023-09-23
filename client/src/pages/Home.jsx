import { GitHub, Linkedin, Twitter, Youtube } from 'react-feather'
import BigText from '../components/BigText'
import IconButton from '../components/IconButton'
import MediumText from '../components/MediumText'
import LeftText from '../components/LeftText'
import BlogBox from '../components/BlogBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
import projectDatas from '../services/projectService'

/**
 * Root page for website.
 *
 * ! Note: Be careful while editing this file.
 *
 * @returns {JSX.Element} Page
 */
const Home = () => {
  const [blogs, setBlogs] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/all`)
      .then(res =>
        setBlogs([
          res.data.datas[
            Math.floor(Math.random() * res.data.datas.length)
          ],
          res.data.datas[
            Math.floor(Math.random() * res.data.datas.length)
          ],
          res.data.datas[
            Math.floor(Math.random() * res.data.datas.length)
          ]
        ])
      )
  }, [mounted])

  return (
    <div className='flex flex-col p-16 gap-y-8 items-center text-center md:text-start md:items-start'>
      <BigText>Merhaba, Bloguma hoşgeldin!</BigText>
      <MediumText>
        Bu sitede kodladığım projeleri, karşılaştığım garip hataların
        çözümlerini, bulduğum güzel paketleri ve daha fazlasını
        paylaşacağım.
      </MediumText>
      <div className='w-[80%] h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4'>
        <IconButton
          icon={<GitHub />}
          text='Github'
        />
        <IconButton
          icon={<Twitter />}
          text='Twitter'
        />
        <IconButton
          icon={<Linkedin />}
          text='Linkedin'
        />
        <IconButton
          icon={<Youtube />}
          text='Youtube'
        />
      </div>
      <LeftText>Önerilenler</LeftText>
      <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {blogs.map(blog => {
          return blog === null ? (
            <></>
          ) : (
            <BlogBox
              title={blog.title}
              shortDescription={blog.description}
              date={blog.date}
              key={blog.title}
            />
          )
        })}
      </div>
      <LeftText>Bazı Projelerim</LeftText>
      <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {projectDatas().map(project => project)}
      </div>
    </div>
  )
}

export default Home
