import Card1 from '@Atoms/ui/Card1'
import { Autocomplete, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  provinceActions,
  selectProvinceList,
  selectProvinceLoading,
} from '../../../../store/slices/provinceSlice'

const CheckoutForm = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const province = useAppSelector(selectProvinceList)
  const loading = useAppSelector(selectProvinceLoading)

  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  console.log(province)

  const handleFormSubmit = async (values: any) => {
    console.log(values)
  }

  useEffect(() => {
    dispatch(provinceActions.fetchProvinceList())
  }, [dispatch])

  return (
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
                <TextField
                  name="shipping_contact"
                  fullWidth
                  sx={{ mb: '1rem' }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_contact || ''}
                  error={!!touched.shipping_contact && !!errors.shipping_contact}
                  helperText={touched.shipping_contact && errors.shipping_contact}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Autocomplete
                  options={province}
                  getOptionLabel={(option: any) => option.name || ''}
                  value={values.shipping_province}
                  sx={{ mb: '1rem' }}
                  fullWidth
                  onChange={(_e, value) => {
                    setFieldValue('shipping_province', value),
                      setDistricts(value.districts)
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
                <Autocomplete
                  options={districts}
                  getOptionLabel={(option: any) => option.name || ''}
                  value={values.shipping_district}
                  sx={{ mb: '1rem' }}
                  fullWidth
                  onChange={(_e, value) => {
                    setFieldValue('shipping_district', value), setWards(value.wards)
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
                <TextField
                  name="shipping_address2"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_address2 || ''}
                  error={!!touched.shipping_address2 && !!errors.shipping_address2}
                  helperText={touched.shipping_address2 && errors.shipping_address2}
                />
              </Grid>
            </Grid>
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
  )
}

interface initialValues {
  shipping_name: any
  shipping_email: any
  shipping_contact: any
  shipping_company: any
  shipping_zip: any
  shipping_province: any
  shipping_district: any
  shipping_ward: any
  shipping_address1: any
  shipping_address2: any
}
const initialValues: initialValues = {
  shipping_name: '',
  shipping_email: '',
  shipping_contact: '',
  shipping_company: '',
  shipping_zip: '',
  shipping_province: 'Thành phố Hà Nội',
  shipping_district: 'Quận Ba Đình',
  shipping_ward: 'Phường Phúc Xá',
  shipping_address1: '',
  shipping_address2: '',
}

// uncommect these fields below for from validation
const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_province: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
})

export default CheckoutForm
