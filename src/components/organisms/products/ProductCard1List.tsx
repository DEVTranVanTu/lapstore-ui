import FlexBox from '@Atoms/ui/FlexBox'
import { Span } from '@Atoms/utils/Typography'
import { Grid, Pagination } from '@material-ui/core'
import { ListResponse, Params } from '@Models/common'
import { Product } from '@Models/product'
import ProductCardDetail from '@Organisms/productcart/ProuctCardDetail'
import { FC } from 'react'

export interface ProductCard1ListProps {
  products: ListResponse<Product>
  params: Params
  loading: boolean
  handleChange: Function
}

const ProductCard1List: FC<ProductCard1ListProps> = (props) => {
  const { products, params, loading, handleChange } = props

  const changeParams = (event: any, value: number) => {
    handleChange(event, value)
  }
  return (
    <div>
      {loading ? (
        ''
      ) : (
        <>
          <Grid container spacing={3}>
            {products.data?.map((item, ind) => (
              <Grid item lg={3} sm={6} xs={12} key={ind}>
                <ProductCardDetail {...item} />
              </Grid>
            ))}
          </Grid>
          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
          >
            <Span color="grey.600">
              Showing {products.data.length} of {products.pagination.totals} Products
            </Span>
            <Pagination
              count={products.pagination.totalPages}
              variant="outlined"
              page={params.page}
              color="primary"
              onChange={changeParams}
            />
          </FlexBox>
        </>
      )}
    </div>
  )
}

export default ProductCard1List
