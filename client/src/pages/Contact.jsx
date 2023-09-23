import { useState } from 'react'
import BigText from '../components/BigText'
import ReactMarkdown from 'react-markdown'
import IconButton from '../components/IconButton'
import { Send } from 'react-feather'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import emailjs from '@emailjs/browser'

/**
 * Contact post for email messages.
 * 
 * ? Please learn Emailjs before editing this file
 *
 * @returns {JSX.Element} Page
 */
const Contact = () => {
  const [markdown, setMarkdown] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (!markdown || !name) {
      alert('Lütfen tüm verileri girdiğinizden emin olun.')
    } else {
      const data = {
        service_id: 'blog_15253545',
        template_id: 'normal15253545',
        template_params: {
          gonderen: name,
          context: markdown
        }
      }

      emailjs
        .send(data.service_id, data.template_id, data.template_params, import.meta.env.VITE_PUBLIC_CODE)
        .then(res => {
          console.log(res)
          alert('E-posta gönderildi!')
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
          alert('E-posta gönderilemedi')
          window.location.reload()
        })
    }
  }

  return (
    <div className='flex flex-col items-center justify-around py-4 px-10 gap-y-4'>
      <BigText>Contact</BigText>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-between'>
        <div className='px-8 py-2 border border-gray-200 rounded-lg h-[600px] items-start overflow-hidden'>
          Markdown
          <div className='h-[90%] w-full'>
            <textarea
              onChange={e => setMarkdown(e.target.value)}
              type='text'
              placeholder='# Hello, *world!*'
              className='text-left w-full resize-none h-full p-4'
              required
              name='context'
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
              onChange={e => setName(e.target.value)}
              type='text'
              placeholder='İsim (örnek: Kemal)'
              className='text-left w-full resize-none h-[75px] p-4 border border-gray-200 rounded-lg'
              required
              name='gonderen'
            ></textarea>
            <div className='flex flex-col md:flex-row gap-2'>
              <IconButton
                icon={<Send />}
                text='Gönder'
                onClick={e => handleSubmit(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
