/* eslint-disable react/prop-types */
const BlogBox = ({ href, title, shortDescription }) => {

  return (
    <a
      href={href}
      className='flex flex-col border-gray-200 border py-2 px-4 pr-[200px] items-start text-left rounded-lg hover:shadow-md shadow-black transition-shadow cursor-pointer'
    >
      <p className='font-semibold text-[1.55rem]'>{title}</p>
      <p>{shortDescription}</p>
    </a>
  )
}

export default BlogBox
