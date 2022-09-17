import { Rating } from '@material-ui/core'
import { compose, spacing, styled, typography } from '@material-ui/system'

const LapstoreRating = styled(Rating)(compose(spacing, typography))

LapstoreRating.defaultProps = {
  fontSize: '1.25rem',
}

export default LapstoreRating
