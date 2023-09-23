import { useState } from 'react'
import BigText from '../components/BigText'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import IconButton from '../components/IconButton'
import { Delete, Send } from 'react-feather'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs'

/**
 * Admin page for writing or deleting blog post.
 *
 * ! Note: Be careful while editing this file.
 *
 * @returns {JSX.Element} Page
 */
const Admin = () => {
  const [markdown, setMarkdown] = useState('')
  const [password, setPassword] = useState('')
  const [key, setKey] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const getUrl = () => {
    const urlC = new URL(
      `${import.meta.env.VITE_BACKEND_API.replace('http', 'https')}`
    )
    let id = title.toLowerCase()
    id = id.replace(/\s+/g, '-')
    id = id.replace(/ş/g, 's')
    id = id.replace(/ğ/g, 'g')
    id = id.replace(/ç/g, 'c')
    id = id.replace(/İ/g, 'I')
    id = id.replace(/ı/g, 'i')
    id = id.replace(/ö/gi, 'o')
    id = id.replace(/[^\w\s.-]/g, '')
    urlC.pathname = '/write'
    urlC.searchParams.set('password', password)
    urlC.searchParams.set('key', key)
    urlC.searchParams.set('title', id)
    urlC.searchParams.set('description', description)
    urlC.searchParams.set('context', markdown)
    const url = urlC.href.replace('https', 'http')
    return url
  }

  const handleSubmit = type => {
    if (type !== 'write' && type !== 'delete') {
      alert("Gönderi tipi 'yazma' veya 'silme' olmalıdır.")
      window.location.reload()
    } else if (type === 'write') {
      axios.post(getUrl()).then(res => {
        window.location.pathname = '/'
        console.log(res.data)
      })

      if (!markdown || !password || !key || !title || !description) {
        alert('Lütfen tüm verileri girdiğinizden emin olun.')
      }
    } else if (type === 'delete') {

      axios.post(getUrl()).then(res => {
        window.location.pathname = '/'
        console.log(res.data)
      })

      if (!password || !key || !title) {
        alert('Lütfen tüm verileri girdiğinizden emin olun.')
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-around py-4 px-10 gap-y-4'>
      <BigText>Admin</BigText>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-between'>
        <div className='px-8 py-2 border border-gray-200 rounded-lg h-[600px] items-start overflow-hidden'>
          Markdown
          <div className='h-[90%] w-full'>
            <textarea
              onChange={e => setMarkdown(e.target.value)}
              type='text'
              placeholder='# Hello, *world!*'
              className='text-left w-full resize-none h-full p-4'
            ></textarea>
          </div>
        </div>
        <div className='px-8 py-2 border border-gray-200 rounded-lg h-[600px] overflow-y-scroll gap-y-2'>
          <ReactMarkdown
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
            {markdown}
          </ReactMarkdown>
        </div>
        <div className='px-8 py-2 border border-gray-200 rounded-lg h-[600px] items-start overflow-hidden flex flex-col gap-y-8'>
          Bilgiler
          <div className='flex flex-col gap-y-2 w-[90%]'>
            <textarea
              onChange={e => setPassword(e.target.value)}
              type='password'
              placeholder='Şifre'
              className='text-left w-full resize-none h-[75px] p-4 border border-gray-200 rounded-lg'
            ></textarea>
            <textarea
              onChange={e => setKey(e.target.value)}
              type='password'
              placeholder='Anahtar'
              className='text-left w-full resize-none h-[75px] p-4 border border-gray-200 rounded-lg'
            ></textarea>
            <textarea
              onChange={e => setTitle(e.target.value)}
              type='text'
              placeholder='Başlık'
              className='text-left w-full resize-none h-[75px] p-4 border border-gray-200 rounded-lg'
            ></textarea>
            <textarea
              onChange={e => setDescription(e.target.value)}
              type='text'
              placeholder='Açıklama'
              className='text-left w-full resize-none h-[75px] p-4 border border-gray-200 rounded-lg'
            ></textarea>
            <div className='flex flex-col md:flex-row gap-2'>
              <IconButton
                icon={<Send />}
                text='Gönder'
                onClick={() => handleSubmit('write')}
              />
              <IconButton
                icon={<Delete />}
                text='Sil'
                onClick={() => handleSubmit('delete')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
