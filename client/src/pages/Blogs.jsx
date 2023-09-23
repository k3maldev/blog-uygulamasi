import LeftText from '../components/LeftText'
import BlogBox from '../components/BlogBox'
import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * Blogs
 *
 *
 * @returns {JSX.Element} Page
 */
const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_API}/all`
      )
      .then(res => setBlogs(res.data.datas))
    setMounted(true)
  }, [mounted])

  return (
    <div className='flex flex-col p-8 gap-y-4'>
      <LeftText>Tüm Bloglarım</LeftText>
      <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {blogs.length !== 0 ? blogs.map(blog => {
          return (
            <BlogBox
              title={blog.title}
              key={blog.title[0].toUpperCase() + blog.title.slice(1, blog.title.length)}
              shortDescription={blog.description.slice(0, 40) + '...'}
              date={blog.date}
            />
          )
        }) : <p className='text-gray-600'>Burası bomboş...</p>}
      </div>
    </div>
  )
}

export default Blogs
