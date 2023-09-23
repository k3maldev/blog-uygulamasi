/* eslint-disable react/prop-types */
const BigText = ({ children, ...props }) => {
  return (
    <p {...props} className="font-bold text-[4rem] md:text-[5rem]">{ children }</p>
  )
}

export default BigText