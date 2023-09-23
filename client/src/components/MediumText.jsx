/* eslint-disable react/prop-types */
const MediumText = ({ children, ...props }) => {
  return (
    <p {...props} className="font-regular text-3xl">{ children }</p>
  )
}

export default MediumText