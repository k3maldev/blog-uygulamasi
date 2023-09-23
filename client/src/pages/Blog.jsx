import { useEffect, useState } from 'react'
import axios from 'axios'
import BigText from '../components/BigText'
import MediumText from '../components/MediumText'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Calendar } from 'react-feather'

/**
 * Blog page for reading some blog.
 *
 *
 * @returns {JSX.Element} Page
 */
const Blog = () => {
  const [blog, setBlog] = useState({
    title: 'Yükleniyor',
    description: 'Yükleniyor',
    context: 'Yükleniyor',
    date: 'Yükleniyor'
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const blogTitle = window.location.pathname.replace('/blog', '')

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_API}/get?title=${blogTitle}`
      )
      .then(res => setBlog(res.data.data))
      .catch(() => {
        window.location.href = '/error'
      })

    setMounted(true)
  }, [mounted])

  return (
    <div className='grid grid-cols-1 items-center mt-8 px-16 gap-y-4'>
      <BigText>{(blog.title[0].toUpperCase() + blog.title.slice(1, blog.title.length)).replace(/-/gi, ' ')}.</BigText>
      <MediumText>{blog.description}</MediumText>
      <p className='text-gray-600 flex flex-row gap-x-3'>
        <Calendar />
        {blog.date}
      </p>

      <ReactMarkdown
        className='mt-[50px] mb-[50px]'
        components={{
          // eslint-disable-next-line no-unused-vars
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, '')}
                style={theme}
                language={match[1]}
                PreTag='div'
                customStyle={{
                  marginTop: '15px'
                }}
                showLineNumbers={true}
              />
            ) : (
              <code
                {...props}
                className={className}
              >
                {children}
              </code>
            )
          }
        }}
      >
        {blog.context}
      </ReactMarkdown>
    </div>
  )
}

export default Blog
