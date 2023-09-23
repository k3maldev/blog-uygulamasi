/* eslint-disable react/prop-types */
const LeftText = ({ children, ...props }) => {
  return (
    <p {...props} className="font-bold text-[3rem] md:text-[4rem] text-left">{ children }</p>
  )
}

export default LeftText