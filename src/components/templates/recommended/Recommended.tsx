import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Category from '@Atoms/icons/Category'
import CategorySectionCreator from '@Molecules/categorysection/CategorySectionCreator'
import LapstoreCard from '@Atoms/ui/LapstoreCard'
import { Box, Grid, Pagination } from '@material-ui/core'
import productDatabase from '@data/product-database'
import ProuctCardDetail from '@Organisms/productcart/ProuctCardDetail'

const useStyles = makeStyles(() => ({
  root: () => ({
    '&>ul': {
      justifyContent: 'center',
    },
  }),
}))

const Recommended = () => {
  const classes = useStyles()

  return (
    <CategorySectionCreator
      icon={<Category color="secondary" />}
      title="Dành cho bạn"
      seeMoreLink="#"
    >
      <LapstoreCard
        sx={{
          display: { xs: 'none', md: 'block' },
          borderRadius: '10px',
          height: '100%',
          boxShadow: 'none',
        }}
      >
        <Box flex="1 1 0" minWidth="0px">
          <Grid container spacing={3}>
            {productDatabase.slice(0, 10).map((item, ind) => (
              <Grid item xs={12} md key={ind}>
                <ProuctCardDetail hoverEffect {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </LapstoreCard>
      <Box mt={'40px'}>
        <Pagination
          className={classes.root}
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </CategorySectionCreator>
  )
}

export default Recommended
