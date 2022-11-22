import React, { useEffect } from 'react'
import Category from '@Atoms/icons/Category'
import CategorySectionCreator from '@Molecules/categorysection/CategorySectionCreator'
import LapstoreCard from '@Atoms/ui/LapstoreCard'
import { Box, Grid } from '@material-ui/core'
import ProductCardReview from '@Organisms/productcart/ProductCardReview'
import LazyImage from '@Atoms/ui/LazyImage'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  selectTopProductDiscount,
  topProductDiscountActions,
} from '../../../../store/slices/productSlice'
const LaptopMacbook = () => {
  const dispatch = useAppDispatch()

  const topProductDiscount = useAppSelector(selectTopProductDiscount)

  useEffect(() => {
    dispatch(topProductDiscountActions.fetchTopProductDiscountList())
  }, [dispatch])
  return (
    <CategorySectionCreator
      icon={<Category color="secondary" />}
      title="Sản phẩm đang giảm giá"
      seeMoreLink="#"
    >
      <Grid container>
        <Grid item lg={3}>
          <Box flex="1 1 0" width="100%" position="relative">
            <LazyImage
              src="/images/banners/laptop-banner.png"
              width={'292px'}
              height={'542px'}
              objectFit="contain"
              alt="electronics"
            />
          </Box>
        </Grid>
        <Grid item lg={9}>
          <LapstoreCard
            sx={{
              display: { xs: 'none', md: 'block' },
              borderRadius: '10px',
              pl: '1.25rem',
              height: '100%',
              boxShadow: 'none',
              backgroundColor: 'grey.100',
            }}
          >
            <Box flex="1 1 0" minWidth="0px">
              <Grid container spacing={2}>
                {topProductDiscount?.slice(0, 8).map((item, ind) => (
                  <Grid item lg={3} sm={6} xs={12} key={ind}>
                    <ProductCardReview hoverEffect topProductDiscount={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </LapstoreCard>
        </Grid>
      </Grid>
    </CategorySectionCreator>
  )
}

export default LaptopMacbook
