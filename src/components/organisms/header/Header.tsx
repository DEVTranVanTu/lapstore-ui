import Category from '@Atoms/icons/Category'
import { MuiThemeProps } from '@Atoms/themes/theme'
import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreAvatar from '@Atoms/ui/LapstoreAvatar'
import LapstoreButton from '@Atoms/ui/LapstoreButton'
import Image from '@Atoms/ui/LapstoreImage'
import { layoutConstant } from '@Atoms/utils/constants'
import { Span } from '@Atoms/utils/Typography'
import {
  Badge,
  Box,
  Container,
  Dialog,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import {
  Logout,
  NotificationsNoneOutlined,
  Person,
  ShoppingCartOutlined,
} from '@material-ui/icons'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import PersonOutline from '@material-ui/icons/PersonOutline'
import { makeStyles } from '@material-ui/styles'
import CategoryMenu from '@Molecules/category/CategoryMenu'
import SearchBox from '@Molecules/searchbox/SearchBox'
import Login from '@Organisms/sessions/Login'
import Signup from '@Organisms/sessions/Signup'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getUserInfo, removeAuthToken, removeUserInfo } from 'utils'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { cartActions, getCart } from '../../../../store/slices/cartSlice'
import { getUserInforLoading } from '../../../../store/slices/userSlice'

type HeaderProps = {
  className?: string
  isFixed?: boolean
}

const useStyles = makeStyles(({ palette, ...theme }: MuiThemeProps) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    padding: '15px 0',
    boxSizing: 'border-box',
    borderBottom: '1px solid #dee2e6',
    height: 'auto',
    background: palette.background.paper,
    transition: 'height 250ms ease-in-out',

    [theme.breakpoints.down('sm')]: {
      height: layoutConstant.mobileHeaderHeight,
    },
  },
  userInfor: {
    cursor: 'pointer',
  },
}))

const Header: React.FC<HeaderProps> = ({ isFixed, className }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const router = useRouter()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [loginForm, setLoginForm] = useState(true)
  const [isLogout, setIsLogout] = useState<Boolean>(false)
  const [userInfor, setUserInfor] = useState<any>(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const toggleDialog = () => setDialogOpen(!dialogOpen)

  const loading = useAppSelector(getUserInforLoading)

  const handleSignIn = (signIn: boolean) => {
    setDialogOpen(signIn)
  }

  const handleChangeForm = (login: boolean) => {
    setLoginForm(login)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onRedirectProfile = () => {
    router.push('/account/profile')
  }

  const onLogout = () => {
    removeUserInfo()
    removeAuthToken()
    const isLogoutStatus = !isLogout
    setIsLogout(isLogoutStatus)
  }

  const cart = useAppSelector(getCart)

  const cartHandle = (
    <Badge badgeContent={cart?.products?.length} color="primary">
      <Box component={IconButton} ml={2.5} p={1.25}>
        <Link href="/cart">
          <ShoppingCartOutlined />
        </Link>
      </Box>
    </Badge>
  )

  useEffect(() => {
    let user = getUserInfo()
    setUserInfor(user)
    const id = user._id

    id && dispatch(cartActions.getCartByUser(id))
  }, [dispatch, loading, isLogout])

  return (
    <div className={clsx(classes.root, className)}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <FlexBox
          alignItems="center"
          mr={2}
          minWidth="170px"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Link href="/">
            <a>
              <Image
                width={'100%'}
                height={'100%'}
                mb={0.5}
                src="/images/logo.png"
                alt="logo"
              />
            </a>
          </Link>

          {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <LapstoreButton color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </LapstoreButton>
              </FlexBox>
            </CategoryMenu>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0" maxWidth="600px">
          <SearchBox />
        </FlexBox>

        <FlexBox alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box
            component={IconButton}
            ml={2}
            p={1.25}
            onClick={toggleDialog}
            display={userInfor ? 'none' : 'flex'}
          >
            <PersonOutline />
          </Box>
          <FlexBox
            alignItems="center"
            ml={2}
            p={1.25}
            display={userInfor ? 'flex' : 'none'}
            className={classes.userInfor}
            onClick={(event) => handleClick(event)}
          >
            <LapstoreAvatar src={userInfor?.profile?.photo} height={30} width={30} />
            <Box ml={2}>
              <Span color="grey.600">{userInfor?.username}</Span>
            </Box>
          </FlexBox>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={onRedirectProfile}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <Box component={IconButton} ml={2} p={1.25} onClick={toggleDialog}>
            <NotificationsNoneOutlined />
          </Box>
          {cartHandle}
        </FlexBox>

        <Dialog
          open={dialogOpen}
          fullWidth={isMobile}
          scroll="body"
          onClose={toggleDialog}
        >
          {loginForm ? (
            <Login handleChangeForm={handleChangeForm} handleSignIn={handleSignIn} />
          ) : (
            <Signup handleChangeForm={handleChangeForm} />
          )}
        </Dialog>
      </Container>
    </div>
  )
}

export default Header
