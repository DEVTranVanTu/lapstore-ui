import LapstoreButton from '@Atoms/ui/LapstoreButton'
import LapstoreTextField from '@Atoms/ui/LapstoreTextField'
import FlexBox from '@Atoms/ui/FlexBox'
import { H3, H6, Small } from '@Atoms/utils/Typography'
import {
  Box,
  Card,
  CardProps,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import * as yup from 'yup'

type StyledCardProps = {
  passwordVisibility?: boolean
}

const StyledCard = styled<React.FC<StyledCardProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => <Card {...rest}>{children}</Card>
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  '.content': {
    padding: '3rem 3.75rem 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem 1rem 0px',
    },
  },
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400],
  },
  '.agreement': {
    marginTop: 12,
    marginBottom: 24,
  },
}))

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const router = useRouter()

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible)
  }, [])

  const handleFormSubmit = async (values: any) => {
    router.push('/profile')
    console.log(values)
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    })

  return (
    <StyledCard elevation={3} passwordVisibility={passwordVisibility}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          Tạo tài khoản ngay
        </H3>
        <Small
          fontWeight="600"
          fontSize="12px"
          color="grey.800"
          textAlign="center"
          mb={4.5}
          display="block"
        >
          Chào mừng bạn đến với chúng tôi
        </Small>

        <LapstoreTextField
          mb={1.5}
          name="name"
          label="Tên đầy đủ"
          placeholder="Trần Văn Tú"
          variant="outlined"
          size="small"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name || ''}
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />

        <LapstoreTextField
          mb={1.5}
          name="email"
          label="Email hoặc Số Điện Thoại"
          placeholder="exmple@mail.com"
          variant="outlined"
          size="small"
          type="email"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ''}
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <LapstoreTextField
          mb={1.5}
          name="password"
          label="Mật khẩu"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? 'text' : 'password'}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <Visibility className="passwordEye" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ''}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <LapstoreTextField
          name="re_password"
          label="Nhập lại mật khẩu"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? 'text' : 'password'}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <Visibility className="passwordEye" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ''}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
        />

        <FormControlLabel
          className="agreement"
          name="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">
              Tôi đồng ý với các điều khoản trên
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Điều khoản
                </H6>
              </a>
            </FlexBox>
          }
        />

        <LapstoreButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            height: 44,
          }}
        >
          Tạo tài khoản
        </LapstoreButton>
        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <Box>Bạn đã có tài khoản?</Box>
          <Link href="/login">
            <a>
              <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                Đăng nhập
              </H6>
            </a>
          </Link>
        </FlexBox>
      </form>
    </StyledCard>
  )
}

const initialValues = {
  name: '',
  email: '',
  password: '',
  re_password: '',
  agreement: false,
}

const formSchema = yup.object().shape({
  name: yup.string().required('${path} is required'),
  email: yup.string().email('invalid email').required('${path} is required'),
  password: yup.string().required('${path} is required'),
  re_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please re-type password'),
  agreement: yup
    .bool()
    .test(
      'agreement',
      'You have to agree with our Terms and Conditions!',
      (value) => value === true
    )
    .required('You have to agree with our Terms and Conditions!'),
})

export default Signup
