/* eslint-disable react/prop-types */
const IconButton = ({ icon, text, href, ...props }) => {
  return (
    <a href={href} {...props} className="py-3 px-8 rounded-lg bg-blue-300/20 hover:text-blue-600 flex flex-row gap-x-4 cursor-pointer text-center items-center justify-center">
      {icon} {text}
    </a>
  )
}

export default IconButton
