import { Box, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface RecommendedMenuProps {
  href: string
  icon?: any
  title: string
  caret?: boolean
  children?: ReactNode
}

const useStyles = makeStyles(({ palette }: MuiThemeProps) => ({
  root: {
    '& .recommended-menu': {
      position: 'relative',
      display: 'block',
      padding: '0.75rem 1.25rem 0.75rem 0',
      backgroundColor: '#fff',
      borderBottom: '1px solid rgba(0,0,0,.125)',
      borderColor: 'rgba(0,0,0,0.1)',
      color: '#4f4f4f',
      '& .title': {
        flexGrow: 1,
      },
    },
    '&:last-child': {
      '& > .recommended-menu': {
        borderBottomWidth: '0',
      },
    },
    '&:hover': {
      '& > .recommended-menu': {
        color: palette.primary.main,
        background: palette.primary.light,
      },

      '& > .mega-menu': {
        display: 'block',
      },
    },
  },
}))

const RecommendedMenu: React.FC<RecommendedMenuProps> = ({
  href,
  title,
  children,
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Link href={href}>
        <MenuItem className="recommended-menu">
          <span className="title">{title}</span>
        </MenuItem>
      </Link>
      {children}
    </Box>
  )
}

export default RecommendedMenu
