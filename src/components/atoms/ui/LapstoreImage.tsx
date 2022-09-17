import { compose, display, spacing, styled } from '@material-ui/system'

const LapstoreImage = styled('img')(compose(spacing, display))

LapstoreImage.defaultProps = {
  display: 'block',
}

export default LapstoreImage
