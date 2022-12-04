import Category from '@Atoms/icons/Category'
import LapstoreCard from '@Atoms/ui/LapstoreCard'
import { Box, Grid, Pagination } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CategorySectionCreator from '@Molecules/categorysection/CategorySectionCreator'
import ProuctCardDetail from '@Organisms/productcart/ProuctCardDetail'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  listProductActions,
  selectAllProduct,
} from '../../../../store/slices/productSlice'

const useStyles = makeStyles(() => ({
  root: () => ({
    '&>ul': {
      justifyContent: 'center',
    },
  }),
}))

const Recommended = () => {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const products = useAppSelector(selectAllProduct)

  const [params, setParams] = useState({
    page: 1,
    limit: 12,
  })
  const handleChange = (event: any, value: number) => {
    setParams({
      page: value,
      limit: 12,
    })
  }

  useEffect(() => {
    dispatch(listProductActions.fetchProductList(params))
  }, [dispatch, params])
  return (
    <CategorySectionCreator
      icon={<Category color="secondary" />}
      title="Laptop"
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
            {products.data.map((item, ind) => (
              <Grid item xs={12} md={2} key={ind}>
                <ProuctCardDetail hoverEffect {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </LapstoreCard>
      <Box mt={'40px'}>
        <Pagination
          count={products.pagination.totalPages}
          variant="outlined"
          page={params.page}
          color="primary"
          onChange={handleChange}
          className={classes.root}
          shape="rounded"
        />
      </Box>
    </CategorySectionCreator>
  )
}

export default Recommended
