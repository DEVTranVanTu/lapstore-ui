import Card1 from '@Atoms/ui/Card1'
import FlexBox from '@Atoms/ui/FlexBox'
import { Paragraph, Span } from '@Atoms/utils/Typography'
import Image from '@Atoms/ui/LapstoreImage'
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  provinceActions,
  selectProvinceList,
} from '../../../../store/slices/provinceSlice'
import { formatVND, getCartItemToPayment } from 'utils'
import ProductCard7Style from '@Organisms/productcart/ProductCard7Style'
import { Box } from '@material-ui/system'
import { orderActions, paymentSuccess } from '../../../../store/slices/orderSlice'

const CheckoutForm = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<any>([])

  const province = useAppSelector(selectProvinceList)
  const checkPaymentSuccess = useAppSelector(paymentSuccess)

  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const handleFormSubmit = async (values: any) => {
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
      payment: { method: values.payment_method },
      shipping: {
        ...values,
        shipping_province: {
          codeName: values.shipping_province.codename,
          name: values.shipping_province.name,
        },
        shipping_district: {
          codeName: values.shipping_district.codename,
          name: values.shipping_district.name,
        },
        shipping_ward: {
          codeName: values.shipping_ward.codename,
          name: values.shipping_ward.name,
        },
      },
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
    dispatch(provinceActions.fetchProvinceList())
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

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Card1 sx={{ mb: '2rem' }}>
              <Typography fontWeight="600" mb={2}>
                Shipping Address
              </Typography>

              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <Paragraph>Tên người nhận</Paragraph>
                  <TextField
                    name="shipping_name"
                    fullWidth
                    sx={{ mb: '1rem' }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shipping_name || ''}
                    error={!!touched.shipping_name && !!errors.shipping_name}
                    helperText={touched.shipping_name && errors.shipping_name}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Paragraph>Số điện thoại người nhận</Paragraph>
                  <TextField
                    name="shipping_phone"
                    fullWidth
                    sx={{ mb: '1rem' }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shipping_phone || ''}
                    error={!!touched.shipping_phone && !!errors.shipping_phone}
                    helperText={touched.shipping_phone && errors.shipping_phone}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Paragraph>Tỉnh/Thành phố</Paragraph>
                  <Autocomplete
                    options={province}
                    getOptionLabel={(option: any) => option.name || ''}
                    value={values.shipping_province}
                    sx={{ mb: '1rem' }}
                    fullWidth
                    onChange={(_e, value) => {
                      setFieldValue('shipping_province', value)
                      setDistricts(value ? value.districts : [])
                      setFieldValue('shipping_district', '')
                      setFieldValue('shipping_ward', '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Select Country"
                        variant="outlined"
                        error={
                          !!touched.shipping_province && !!errors.shipping_province
                        }
                        helperText={
                          touched.shipping_province && errors.shipping_province
                        }
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Paragraph>Quận/Huyện</Paragraph>
                  <Autocomplete
                    options={districts}
                    getOptionLabel={(option: any) => option.name || ''}
                    value={values.shipping_district}
                    sx={{ mb: '1rem' }}
                    fullWidth
                    onChange={(_e, value) => {
                      setFieldValue('shipping_district', value),
                        setWards(value ? value.wards : []),
                        setFieldValue('shipping_ward', '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Select District"
                        variant="outlined"
                        error={
                          !!touched.shipping_district && !!errors.shipping_district
                        }
                        helperText={
                          touched.shipping_district && errors.shipping_district
                        }
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Paragraph>Xã/Phường</Paragraph>
                  <Autocomplete
                    options={wards}
                    getOptionLabel={(option: any) => option.name || ''}
                    value={values.shipping_ward}
                    sx={{ mb: '1rem' }}
                    fullWidth
                    onChange={(_e, value) => setFieldValue('shipping_ward', value)}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Select Ward"
                        variant="outlined"
                        error={!!touched.shipping_ward && !!errors.shipping_ward}
                        helperText={touched.shipping_ward && errors.shipping_ward}
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Paragraph>Chi tiết (Đường, số nhà...)</Paragraph>
                  <TextField
                    name="shipping_address"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shipping_address || ''}
                    error={!!touched.shipping_address && !!errors.shipping_address}
                    helperText={touched.shipping_address && errors.shipping_address}
                  />
                </Grid>
              </Grid>
            </Card1>
            <Card1 sx={{ mb: '2rem' }}>
              <Typography fontWeight="600" mb={2}>
                Payment method
              </Typography>

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={values.payment_method || 1}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Thanh toán khi nhận hàng"
                  />
                  <FormControlLabel value="2" control={<Radio />} label="Momo" />
                </RadioGroup>
              </FormControl>
            </Card1>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <Link href="/cart">
                  <Button variant="outlined" color="primary" type="button" fullWidth>
                    Back to Cart
                  </Button>
                </Link>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Proceed to Payment
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

interface initialValues {
  shipping_name: any
  shipping_phone: any
  shipping_company: any
  shipping_province: any
  shipping_district: any
  shipping_ward: any
  shipping_address: any
  payment_method: any
}
const initialValues: initialValues = {
  shipping_name: '',
  shipping_phone: '',
  shipping_company: '',
  shipping_province: '',
  shipping_district: '',
  shipping_ward: '',
  shipping_address: '',
  payment_method: '1',
}

// uncommect these fields below for from validation
const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_phone: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_province: yup.object().required("required"),
  // shipping_address: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
})

export default CheckoutForm
