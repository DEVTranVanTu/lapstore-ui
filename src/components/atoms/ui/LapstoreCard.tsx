import { Card, CardProps } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import React from 'react'

type LapstoreCardProps = {
  hoverEffect?: boolean
}

const LapstoreCard = styled<React.FC<LapstoreCardProps & CardProps>>(
  ({ hoverEffect, children, ...rest }) => <Card {...rest}>{children}</Card>
)<LapstoreCardProps>(({ theme, hoverEffect }) => ({
  borderRadius: '8px',
  overflow: 'unset',
  transition: 'all 250ms ease-in-out',
  '&:hover': {
    boxShadow: hoverEffect ? theme.shadows[3] : '',
  },
}))

LapstoreCard.defaultProps = {
  hoverEffect: false,
}

export default LapstoreCard
