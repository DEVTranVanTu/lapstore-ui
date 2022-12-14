import Card1 from '@Atoms/ui/Card1'
import FlexBox from '@Atoms/ui/FlexBox'
import { Paragraph, Span } from '@Atoms/utils/Typography'
import Image from '@Atoms/ui/LapstoreImage'
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { formatVND, getCartItemToPayment } from 'utils'
import ProductCard7Style from '@Organisms/productcart/ProductCard7Style'
import { Box } from '@material-ui/system'
import { orderActions, paymentSuccess } from '../../../../store/slices/orderSlice'
import ShippingForm from './ShippingForm'

const CheckoutForm = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<any>([])
  const [payment_method, setPaymentMethod] = useState('1')
  const [shipping, setShipping] = useState({})
  const checkPaymentSuccess = useAppSelector(paymentSuccess)

  const selectAddress = (data: any) => {
    setShipping(data)
  }
  const handleFormSubmit = async () => {
    const cartItem = getCartItemToPayment()
    const productItem = products.map((i: any) => {
      return {
        productId: i.productId,
        quantity: i.quantity,
      }
    })
    const data = {
      userId: cartItem.userId,
      cartId: cartItem.cartId,
      products: productItem,
      payment: { method: parseInt(payment_method) },
      shipping: shipping,
    }
    if (data) {
      dispatch(orderActions.payment(data))
    }
  }

  useEffect(() => {
    checkPaymentSuccess && router.push('/cart')
  }, [checkPaymentSuccess])

  useEffect(() => {
    const cartItem = getCartItemToPayment()

    setProducts(cartItem?.products)
  }, [dispatch])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {products?.map((item: any) => (
            <ProductCard7Style key={item.productId}>
              <Image
                src={item.productThumbnail}
                height={140}
                width={140}
                display="block"
                alt={item.productName}
              />
              <FlexBox
                className="product-details"
                flexDirection="column"
                justifyContent="space-between"
                minWidth="0px"
                width="100%"
              >
                <Box>
                  <Link href={`/product/${item.productId}`}>
                    <a>
                      <Span
                        className="title"
                        fontWeight="600"
                        fontSize="18px"
                        mb={1}
                      >
                        {item.productName}
                      </Span>
                    </a>
                  </Link>
                  <Paragraph color={'#1266f1'} fontWeight={600}>
                    {formatVND(item.price)}
                  </Paragraph>
                </Box>

                <FlexBox justifyContent="space-between" alignItems="flex-end">
                  <FlexBox flexWrap="wrap" alignItems="center">
                    <Span color="grey.600" mr={1}></Span>
                    <Span fontWeight={600} color="primary.main" mr={2}></Span>
                  </FlexBox>

                  <FlexBox alignItems="center">
                    <Span mx={1} fontWeight="600" fontSize="15px">
                      Số lượng: {item.quantity}
                    </Span>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </ProductCard7Style>
          ))}
        </Grid>
      </Grid>
      <ShippingForm selectAddress={selectAddress} />
      <Card1 sx={{ mb: '2rem' }}>
        <Typography fontWeight="600" mb={2}>
          Phương thức thanh toán
        </Typography>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={payment_method || '1'}
            name="radio-buttons-group"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Thanh toán khi nhận hàng"
            />
          </RadioGroup>
        </FormControl>
      </Card1>
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <Link href="/cart">
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Quay lại giỏ hàng
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={handleFormSubmit}
          >
            Tiến hành thanh toán
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default CheckoutForm
