import FlexBox from '@Atoms/ui/FlexBox'
import CheckoutNavLayout from '@Layouts/CheckoutNavLayout'
import ProductCard7 from '@Organisms/productcart/ProductCard7'
import { H3, Span } from '@Atoms/utils/Typography'
import { Button, Card, Divider, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import {
  formatVND,
  getUserInfo,
  setCartItemToPayment,
  removeStoreCartItem,
} from 'utils'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addToCartLoading,
  addToCartSuccess,
  cartActions,
  getCart,
  getCartLoading,
  removeSuccess,
} from '../store/slices/cartSlice'
import router from 'next/router'

const Cart = () => {
  const getTotalPrice = (data: any) => {
    return (
      data.reduce(
        (pre: number, cur: any) =>
          pre +
          cur.quantity *
            (cur.price - (cur.discount > 0 ? (cur.price * cur.discount) / 100 : 0)),
        0
      ) || 0
    )
  }

  const dispatch = useAppDispatch()

  const [products, setProducts] = useState<any>([])
  const [totalPrice, setTotalPrice] = useState(0)

  const cart = useAppSelector(getCart)
  const loading = useAppSelector(getCartLoading)
  const checkRemoveSuccess = useAppSelector(removeSuccess)
  const checkAddToCart = useAppSelector(addToCartSuccess)
  const loadingAddToCart = useAppSelector(addToCartLoading)
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
  }

  const handlePayment = () => {
    let user = getUserInfo()
    const id = user?._id
    const cartId = cart._id
    const cartInfor = {
      userId: id,
      cartId: cartId,
      products: products,
      totalPrice: totalPrice,
    }

    setCartItemToPayment(cartInfor)
    router.push('/checkout')
  }

  const removeCartItem = (data: any) => {
    dispatch(cartActions.removeCartItem(data))
  }

  useEffect(() => {
    let user = getUserInfo()
    const id = user?._id
    removeStoreCartItem()

    id && dispatch(cartActions.getCartByUser(id))
  }, [dispatch, products, checkRemoveSuccess, checkAddToCart])

  useEffect(() => {
    let user = getUserInfo()
    const id = user?._id
    removeStoreCartItem()
    id && dispatch(cartActions.getCartByUser(id))
  }, [dispatch, checkAddToCart, loadingAddToCart])

  return (
    <CheckoutNavLayout>
      {loading
        ? ''
        : cart.products.length > 0 && (
            <Grid container spacing={3}>
              <Grid item lg={8} md={8} xs={12}>
                {cart.products.map((item: any) => (
                  <ProductCard7
                    key={item.product._id}
                    cartId={cart._id}
                    products={item}
                    selectCartItem={selectCartItem}
                    removeCartItem={removeCartItem}
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

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={products.length <= 0}
                    onClick={handlePayment}
                  >
                    Mua ngay
                  </Button>
                </Card>
              </Grid>
            </Grid>
          )}
      {cart.products.length <= 0 && <H3>Chưa có sản phẩm nào !</H3>}
    </CheckoutNavLayout>
  )
}

export default Cart
