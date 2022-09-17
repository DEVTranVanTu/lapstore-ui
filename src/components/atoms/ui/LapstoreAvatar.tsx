import { Avatar } from '@material-ui/core'
import {
  border,
  compose,
  sizing,
  spacing,
  styled,
  typography,
} from '@material-ui/system'

const LapstoreAvatar = styled(Avatar)(compose(spacing, typography, sizing, border))

export default LapstoreAvatar
