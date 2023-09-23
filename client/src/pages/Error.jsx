import BigText from '../components/BigText'
import MediumText from '../components/MediumText'
import IconButton from '../components/IconButton'
import { ArrowLeft } from 'react-feather'

/**
 * Error page for 404 or other
 *
 *
 * @returns {JSX.Element} Page
 */
// eslint-disable-next-line react/prop-types
const Error = ({ notFound }) => {
  const errorType = (notFound ?? true) === true ? '404' : 'other'

  return (
    <div className='flex flex-col items-center gap-y-8 mt-[150px] px-8 text-center'>
      <BigText>Opps!</BigText>
      <MediumText>
        {errorType === '404'
          ? 'Görünüşe göre böyle bir sayfa yok veya ismi değiştirilmiş.'
          : 'Beklenmeyen bir hata oluştu.'}
      </MediumText>
      <IconButton
        icon={<ArrowLeft />}
        text='Ana Sayfaya Dön'
        href='/'
      />
    </div>
  )
}

export default Error
