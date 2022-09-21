import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreButton from '@Atoms/ui/LapstoreButton'
import Image from '@Atoms/ui/LapstoreImage'
import LapstoreTextField from '@Atoms/ui/LapstoreTextField'
import { H3, H6, Small } from '@Atoms/utils/Typography'
import { Box, Card, CardProps, Divider, IconButton } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { AuthData } from '@Models/user'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch } from '../../../../store/hooks'
import { userActions } from '../../../../store/slices/userSlice'

const fbStyle = {
  background: '#3B5998',
  color: 'white',
}
const googleStyle = {
  background: '#4285F4',
  color: 'white',
}

type StyledCardProps = {
  passwordVisibility?: boolean
}

interface login {
  handleChangeForm: Function
  handleSignIn: Function
}

const StyledCard = styled<React.FC<StyledCardProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => <Card {...rest}>{children}</Card>
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '.signup': {
    cursor: 'pointer',
  },
  '.content': {
    textAlign: 'center',
    padding: '3rem 3.75rem 0px',
    marginBottom: '3rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem 1rem 0px',
    },
  },
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400],
  },
  '.facebookButton': {
    marginBottom: 10,
    '&:hover': fbStyle,
    ...fbStyle,
  },
  '.googleButton': {
    '&:hover': googleStyle,
    ...googleStyle,
  },
  '.agreement': {
    marginTop: 12,
    marginBottom: 24,
  },
}))

const Login: FC<login> = ({ handleChangeForm, handleSignIn }) => {
  const dispatch = useAppDispatch()

  const changeForm = () => {
    handleChangeForm(false)
  }

  const checkSignIn = () => {
    handleSignIn(false)
  }

  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const router = useRouter()

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible)
  }, [])

  const handleFormSubmit = async (values: AuthData) => {
    dispatch(userActions.login(values))
    checkSignIn()
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
          Chào mừng trở lại
        </H3>
        <Small
          fontWeight="600"
          fontSize="12px"
          color="grey.800"
          textAlign="center"
          mb={4.5}
          display="block"
        >
          Đăng nhập với email & password
        </Small>

        <LapstoreTextField
          mb={1.5}
          name="email"
          label="Email hoặc Số Điện Thoại"
          placeholder="Nhập vào Email hoặc số điện thoại"
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
          mb={2}
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
        <FlexBox pt={2} pb={2.5}>
          Bạn quên mật khẩu?
          <Link href="/">
            <a>
              <H6 ml={1} borderColor="grey.900">
                Lấy lại
              </H6>
            </a>
          </Link>
        </FlexBox>
        <LapstoreButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            mb: '1.65rem',
            height: 44,
          }}
        >
          Đăng nhập
        </LapstoreButton>

        <Box mb={2}>
          <Box width="200px" mx="auto">
            <Divider />
          </Box>

          <FlexBox justifyContent="center" mt={-1.625}>
            <Box color="grey.600" bgcolor="background.paper" px={2}>
              Hoặc
            </Box>
          </FlexBox>
        </Box>

        <LapstoreButton
          className="facebookButton"
          size="medium"
          fullWidth
          sx={{
            mb: '10px',
            height: 44,
          }}
        >
          <Image src="/icons/facebook-filled-white.svg" alt="facebook" />
          <Box fontSize="12px" ml={1}>
            Đăng nhập với Facebook
          </Box>
        </LapstoreButton>
        <LapstoreButton
          className="googleButton"
          size="medium"
          fullWidth
          sx={{
            height: 44,
          }}
        >
          <Image src="/icons/google-1.svg" alt="facebook" />
          <Box fontSize="12px" ml={1}>
            Đăng nhập với Google
          </Box>
        </LapstoreButton>

        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <Box>Bạn chưa có tài khoản?</Box>

          <H6
            ml={1}
            className="signup"
            borderBottom="1px solid"
            borderColor="grey.900"
            onClick={changeForm}
          >
            Đăng ký
          </H6>
        </FlexBox>
      </form>
    </StyledCard>
  )
}

const initialValues = {
  email: '',
  password: '',
}

const formSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('${path} is required'),
  password: yup.string().required('${path} is required'),
})

export default Login
