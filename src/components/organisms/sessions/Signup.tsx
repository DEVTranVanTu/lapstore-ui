import LapstoreButton from '@Atoms/ui/LapstoreButton'
import LapstoreTextField from '@Atoms/ui/LapstoreTextField'
import FlexBox from '@Atoms/ui/FlexBox'
import { H3, H6, Paragraph, Small } from '@Atoms/utils/Typography'
import {
  Box,
  Button,
  Card,
  CardProps,
  Dialog,
  IconButton,
  TextField,
  useMediaQuery,
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useTheme } from '@material-ui/core/styles'

import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  registerActions,
  registerResponse,
  verifyEmailActions,
  verifyResponse,
} from '../../../../store/slices/userSlice'

type StyledCardProps = {
  passwordVisibility?: boolean
}

interface signup {
  handleChangeForm: Function
}

const StyledCard = styled<React.FC<StyledCardProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => <Card {...rest}>{children}</Card>
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '.signin': {
    cursor: 'pointer',
  },
  '.content': {
    padding: '3rem 3.75rem 0px',
    marginBottom: '3rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem 1rem 0px',
    },
  },
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400],
  },
}))

const Signup: FC<signup> = ({ handleChangeForm }) => {
  const dispatch = useAppDispatch()

  const [dialogOpen, setDialogOpen] = useState(false)
  const toggleDialog = () => setDialogOpen(!dialogOpen)
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [otp, setOtp] = useState('')
  const [data, setData] = useState<any>()
  const router = useRouter()

  const verifyMessage = useAppSelector(verifyResponse)
  const register = useAppSelector(registerResponse)

  const changeForm = () => {
    handleChangeForm(true)
  }

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible)
  }, [])

  const handleFormSubmit = async (values: any) => {
    const data = {
      email: values?.email,
      username: values?.name,
      password: values?.password,
      otp: otp,
    }
    setData(values)
    dispatch(verifyEmailActions.verifyEmail(data))
  }

  const handleVerifyEmail = async () => {
    const dataConfirm = {
      email: data?.email,
      username: data?.name,
      password: data?.password,
      otp: otp,
    }
    dispatch(registerActions.register(dataConfirm))
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    })

  useEffect(() => {
    if (verifyMessage.success) {
      toggleDialog()
    }
  }, [verifyMessage])

  useEffect(() => {
    if (register.success) {
      console.log('register', register)
      router.push('/account/profile')
    }
  }, [register])
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
          label="Tên người dùng"
          placeholder="Nhập tên ..."
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
          label="Nhập email ..."
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

        <LapstoreButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            height: 44,
            mt: 2,
          }}
        >
          Tạo tài khoản
        </LapstoreButton>
        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <Box>Bạn đã có tài khoản?</Box>
          <H6
            ml={1}
            className="signin"
            borderBottom="1px solid"
            borderColor="grey.900"
            onClick={changeForm}
          >
            Đăng nhập
          </H6>
        </FlexBox>
      </form>
      <Dialog
        open={dialogOpen}
        fullWidth={isMobile}
        scroll="body"
        onClose={toggleDialog}
      >
        <Box px={4} py={2}>
          <Paragraph color="grey.700">Nhập mã OTP</Paragraph>
          <Paragraph color="grey.500">
            Mã OPT đã được gửi đến email của bạn.
          </Paragraph>
          <Box my={1}>
            <TextField
              name="voucher"
              placeholder="Nhập mã OTP"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="button"
            fullWidth
            onClick={handleVerifyEmail}
          >
            Xác nhận
          </Button>
        </Box>
      </Dialog>
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
})

export default Signup
