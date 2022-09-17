import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { ReactNode } from 'react'
import CategorySectionHeader from './CategorySectionHeader'

export interface CategorySectionCreatorProps {
  icon?: ReactNode
  title?: string
  seeMoreLink?: string
}

const useStyles = makeStyles(() => ({
  root: () => ({
    borderRadius: '0.375rem',
    background: '#fff',
    boxShadow: 'rgb(0 0 0 / 5%) 0px 10px 20px 0px',
    overflow: 'hidden',
  }),
}))
const CategorySectionCreator: React.FC<CategorySectionCreatorProps> = ({
  icon,
  seeMoreLink,
  title,
  children,
}) => {
  const classes = useStyles()

  return (
    <Box mb={7.5} mt={5}>
      <Container sx={{ pb: '1rem' }} className={classes.root}>
        <Box p={'2rem 0 0.5rem 0'}>
          {title && (
            <CategorySectionHeader
              title={title}
              seeMoreLink={seeMoreLink}
              icon={icon}
            />
          )}

          {children}
        </Box>
      </Container>
    </Box>
  )
}

export default CategorySectionCreator
