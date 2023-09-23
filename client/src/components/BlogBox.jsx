import { Calendar } from 'react-feather'

/* eslint-disable react/prop-types */
const BlogBox = ({ title, shortDescription, date }) => {
  let id = title.toLowerCase()
  id = id.replace(/\s+/g, '-')
  id = id.replace(/ş/g, 's')
  id = id.replace(/ğ/g, 'g')
  id = id.replace(/ç/g, 'c')
  id = id.replace(/İ/g, 'I')
  id = id.replace(/ı/g, 'i')
  id = id.replace(/ö/gi, 'o')
  id = id.replace(/[^\w\s.-]/g, '')

  return (
    <a
      href={id}
      className='flex flex-col border-gray-200 border py-2 px-4 pr-[200px] items-start text-left rounded-lg hover:shadow-md shadow-black transition-shadow cursor-pointer'
    >
      <p className='font-semibold text-[1.55rem]'>{title}</p>
      <p>{shortDescription}</p>
      <p className='flex flex-row gap-x-2 text-gray-500'>
        {<Calendar />} {date}
      </p>
    </a>
  )
}

export default BlogBox
