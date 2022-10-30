import FlexBox from '@Atoms/ui/FlexBox'
import CheckoutNavLayout from '@Layouts/CheckoutNavLayout'
import ProductCard7 from '@Organisms/productcart/ProductCard7'
import { Span } from '@Atoms/utils/Typography'
import { Button, Card, Divider, Grid } from '@material-ui/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { formatVND, getUserInfo } from 'utils'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { cartActions, getCart, getCartLoading } from '../store/slices/cartSlice'

const Cart = () => {
  const getTotalPrice = (data: any) => {
    return (
      data.reduce(
        (pre: number, cur: any) => pre + cur.quantity * cur.product.price,
        0
      ) || 0
    )
  }

  const dispatch = useAppDispatch()

  const [products, setProducts] = useState([])

  const cart = useAppSelector(getCart)
  const loading = useAppSelector(getCartLoading)
  console.log(cart)

  const selectCartItem = (data: any) => {
    setProducts(products)
  }

  useEffect(() => {
    let user = getUserInfo()
    const id = user?._id

    id && dispatch(cartActions.getCartByUser(id))
  }, [dispatch])

  return (
    <CheckoutNavLayout>
      {loading ? (
        ''
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            {cart.products.map((item: any) => (
              <ProductCard7
                key={item.product._id}
                products={item}
                selectCartItem={selectCartItem}
              />
            ))}
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Card
              sx={{
                padding: '1.5rem 1.75rem',
                '@media only screen and (max-width: 678px)': {
                  padding: '1rem',
                },
              }}
            >
              <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
                <Span color="grey.600">Tổng:</Span>
                <FlexBox alignItems="flex-end">
                  <Span fontSize="18px" fontWeight="600" lineHeight="1">
                    {formatVND(getTotalPrice(cart.products))}
                  </Span>
                </FlexBox>
              </FlexBox>

              <Divider sx={{ mb: '1rem' }} />

              <Link href="/checkout">
                <Button variant="contained" color="primary" fullWidth>
                  Mua ngay
                </Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      )}
    </CheckoutNavLayout>
  )
}

export default Cart
