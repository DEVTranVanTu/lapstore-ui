import NavbarLayout from '@Layouts/NavbarLayout'
import ProductDescription from '@Organisms/products/ProductDescription'
import ProductIntro from '@Organisms/products/ProductIntro'
import ProductReview from '@Organisms/products/ProductReview'
import RelatedProducts from '@Organisms/products/RelatedProducts'
import { Box, Tab, Tabs } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getProductDetail,
  getProductDetailLoading,
  productDetailActions,
} from '../../store/slices/productBySubSlice'
import { useRouter } from 'next/router'

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginTop: 80,
  marginBottom: 24,
  minHeight: 0,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  '& .inner-tab': {
    fontWeight: 600,
    minHeight: 40,
    textTransform: 'capitalize',
  },
}))

const ProductDetails = () => {
  const dispatch = useAppDispatch()
  const [selectedOption, setSelectedOption] = useState(0)

  const { query } = useRouter()
  const id: string = String(query.id)?.split('.', -1)[1]

  const handleOptionClick = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedOption(newValue)
  }

  const productDetail = useAppSelector(getProductDetail)
  const loading = useAppSelector(getProductDetailLoading)

  useEffect(() => {
    id && dispatch(productDetailActions.fetchProductDetail(id))
  }, [dispatch, id])
  return (
    <NavbarLayout>
      {loading ? (
        ''
      ) : (
        <>
          <ProductIntro {...productDetail} />

          <StyledTabs
            value={selectedOption}
            onChange={handleOptionClick}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab className="inner-tab" label="Description" />
            <Tab className="inner-tab" label="Review (3)" />
          </StyledTabs>

          <Box mb={6}>
            {selectedOption === 0 && <ProductDescription />}
            {selectedOption === 1 && <ProductReview />}
          </Box>

          <RelatedProducts />
        </>
      )}
    </NavbarLayout>
  )
}

export default ProductDetails
