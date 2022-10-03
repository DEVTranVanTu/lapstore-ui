import FlexBox from '@Atoms/ui/FlexBox'
import { BoxProps } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { SxProps } from '@material-ui/system'
import React, { ReactNode } from 'react'

interface AccordionHeaderProps {
  showIcon?: boolean
  sx?: SxProps
  open?: boolean
  children: ReactNode
}

const StyledFlexBox = styled<React.FC<AccordionHeaderProps>>(
  ({ children, open, ...rest }) => <FlexBox {...rest}>{children}</FlexBox>
)<AccordionHeaderProps>(({ open }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  '.caretIcon': {
    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 250ms ease-in-out',
  },
}))

const AccordionHeader: React.FC<AccordionHeaderProps & BoxProps> = ({
  children,
  showIcon,
  open,
  sx,
  ...props
}) => {
  return (
    <StyledFlexBox open={open} sx={sx} {...props}>
      {children}
      {showIcon && <ChevronRight className="caretIcon" fontSize="small" />}
    </StyledFlexBox>
  )
}

AccordionHeader.defaultProps = {
  showIcon: true,
  py: '0.5rem',
  px: '1rem',
}

export default AccordionHeader
