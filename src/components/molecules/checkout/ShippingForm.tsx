import Card1 from '@Atoms/ui/Card1'
import { Paragraph, Span } from '@Atoms/utils/Typography'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { getUserInfo } from 'utils'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  provinceActions,
  selectProvinceList,
} from '../../../../store/slices/provinceSlice'
import * as yup from 'yup'
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
import { Box } from '@material-ui/system'
import {
  addShippingActions,
  addShippingData,
  addShippingLoading,
  selectShippingList,
  selectShippingLoading,
  shippingActions,
} from '../../../../store/slices/shippingSlice'
import { Add } from '@material-ui/icons'
import FlexBox from '@Atoms/ui/FlexBox'
import { makeStyles } from '@material-ui/styles'
type Props = {
  selectAddress: Function
  id?: String
}

const useStyles = makeStyles({
  addressItem: {
    '&:not(:last-child)': {
      borderBottom: '.5px solid #7D879C',
      paddingBottom: '15px',
      marginBottom: '15px',
    },
  },
})

export default function ShippingForm({ selectAddress, id }: Props) {
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const province = useAppSelector(selectProvinceList)
  const shippingAddress = useAppSelector(selectShippingList)
  const shippingAddressLoading = useAppSelector(selectShippingLoading)

  const addShippingAddressLoading = useAppSelector(addShippingLoading)
  const addShippingAddressData = useAppSelector(addShippingData)

  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [showNewForm, setShowNewForm] = useState(false)
  const [chooseAddress, setChooseAddress] = useState<any>(id ? id : '')

  const handleFormSubmit = async (values: any) => {
    const userInfo = getUserInfo()
    const data = {
      userId: userInfo._id,
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
      dispatch(addShippingActions.addShippingAddress(data))
    }
  }

  const handleChangeShippingAddress = (id: string) => {
    if (!id) {
      selectAddress(shippingAddress[0])
      return
    }
    const index = shippingAddress.findIndex((i: any) => i._id === id)
    if (index >= 0) {
      selectAddress(shippingAddress[index])
    }
  }
  useEffect(() => {
    handleChangeShippingAddress(chooseAddress)
  }, [chooseAddress, shippingAddress])

  useEffect(() => {
    if (addShippingAddressData.success) {
      setShowNewForm(false)
    }
  }, [addShippingAddressLoading])

  useEffect(() => {
    const userInfo = getUserInfo()
    const id = userInfo._id
    id && dispatch(shippingActions.fetchShippingList(id))
    dispatch(provinceActions.fetchProvinceList())
  }, [dispatch, addShippingAddressLoading])

  return (
    <Box>
      <Box>
        <Card1 sx={{ mb: '2rem' }}>
          <Typography fontWeight="600" mb={2}>
            Địa chỉ đã lưu
          </Typography>
          {!shippingAddressLoading && (
            <FormControl fullWidth>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={!!chooseAddress ? chooseAddress : shippingAddress[0]?._id}
                name="radio-buttons-group"
                onChange={(e) => setChooseAddress(e.target.value)}
              >
                {shippingAddress?.map((item: any) => (
                  <FlexBox key={item._id} className={classes.addressItem}>
                    <FormControlLabel
                      value={item._id}
                      control={<Radio />}
                      label=""
                    />
                    <Box>
                      <Paragraph>
                        <Span fontWeight={600}>Người nhận:</Span>{' '}
                        {item.shipping.shipping_name}
                      </Paragraph>
                      <Paragraph>
                        <Span fontWeight={600}>Số điện thoại người nhận:</Span>{' '}
                        {item.shipping.shipping_phone}
                      </Paragraph>
                      <Paragraph>
                        <Span fontWeight={600}>Địa chỉ giao hàng:</Span>{' '}
                        {item.shipping.shipping_address +
                          ', ' +
                          item.shipping.shipping_ward.name +
                          ', ' +
                          item.shipping.shipping_district.name +
                          ', ' +
                          item.shipping.shipping_province.name}
                      </Paragraph>
                    </Box>
                  </FlexBox>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </Card1>
      </Box>
      {!showNewForm && (
        <Box display={'flex'} justifyContent={'flex-end'} mb={4} pr={4}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setShowNewForm(true)}
          >
            Thêm địa chỉ mới
          </Button>
        </Box>
      )}

      {showNewForm && (
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
                      helperText={
                        touched.shipping_address && errors.shipping_address
                      }
                    />
                  </Grid>
                </Grid>
              </Card1>
              <Grid item sm={12} mb={5}>
                <FlexBox justifyContent={'flex-end'} pr={4}>
                  <Box mr={5}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setShowNewForm(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Button variant="contained" color="primary" type="submit">
                    Add new shipping address
                  </Button>
                </FlexBox>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </Box>
  )
}

interface initialValues {
  shipping_name: any
  shipping_phone: any
  shipping_province: any
  shipping_district: any
  shipping_ward: any
  shipping_address: any
}
const initialValues: initialValues = {
  shipping_name: '',
  shipping_phone: '',
  shipping_province: {},
  shipping_district: {},
  shipping_ward: {},
  shipping_address: '',
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const checkoutSchema = yup.object().shape({
  shipping_name: yup.string().required('required'),
  shipping_phone: yup
    .string()
    .required('required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  shipping_province: yup.object().required('required'),
  shipping_district: yup.object().required('required'),
  shipping_ward: yup.object().required('required'),
  shipping_address: yup.string().required('required'),
})
