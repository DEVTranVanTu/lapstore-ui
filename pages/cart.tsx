import FlexBox from '@Atoms/ui/FlexBox'
import CheckoutNavLayout from '@Layouts/CheckoutNavLayout'
import ProductCard7 from '@Organisms/productcart/ProductCard7'
import { Span } from '@Atoms/utils/Typography'
import { Button, Card, Divider, Grid } from '@material-ui/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { formatVND, getUserInfo, setCartItemToPayment } from 'utils'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { cartActions, getCart, getCartLoading } from '../store/slices/cartSlice'

const Cart = () => {
  const getTotalPrice = (data: any) => {
    return (
      data.reduce((pre: number, cur: any) => pre + cur.quantity * cur.price, 0) || 0
    )
  }

  const dispatch = useAppDispatch()

  const [products, setProducts] = useState<any>([])
  const [totalPrice, setTotalPrice] = useState(0)

  const cart = useAppSelector(getCart)
  const loading = useAppSelector(getCartLoading)

  const selectCartItem = (data: any) => {
    const listProduct = products
    const index = listProduct.findIndex((i: any) => i.productId === data.productId)
    if (index >= 0) {
      listProduct.splice(index, 1)
    } else {
      listProduct.push(data)
    }
    setTotalPrice(getTotalPrice(listProduct))

    setProducts(listProduct)
    let user = getUserInfo()
    const id = user?._id
    const cartId = cart._id
    const cartInfor = {
      userId: id,
      cartId: cartId,
      products: listProduct,
      totalPrice: totalPrice,
    }
    setCartItemToPayment(cartInfor)
  }

  useEffect(() => {
    let user = getUserInfo()
    const id = user?._id

    id && dispatch(cartActions.getCartByUser(id))
  }, [dispatch, products])

  return (
    <CheckoutNavLayout>
      {loading && cart.products.length > 0 ? (
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
                    {formatVND(totalPrice)}
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
