import Category from '@Atoms/icons/Category'
import { MuiThemeProps } from '@Atoms/themes/theme'
import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreAvatar from '@Atoms/ui/LapstoreAvatar'
import LapstoreButton from '@Atoms/ui/LapstoreButton'
import Image from '@Atoms/ui/LapstoreImage'
import { layoutConstant } from '@Atoms/utils/constants'
import { Span } from '@Atoms/utils/Typography'
import { useAppContext } from '@context/app/AppContext'
import {
  Badge,
  Box,
  Container,
  Dialog,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { NotificationsNoneOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import PersonOutline from '@material-ui/icons/PersonOutline'
import { makeStyles } from '@material-ui/styles'
import CategoryMenu from '@Molecules/category/CategoryMenu'
import MiniCart from '@Molecules/minicart/MiniCart'
import SearchBox from '@Molecules/searchbox/SearchBox'
import Login from '@Organisms/sessions/Login'
import Signup from '@Organisms/sessions/Signup'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getUserInfo } from 'utils'

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
}))

const Header: React.FC<HeaderProps> = ({ isFixed, className }) => {
  const [sidenavOpen, setSidenavOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen)
  const toggleDialog = () => setDialogOpen(!dialogOpen)

  const [loginForm, setLoginForm] = useState(true)
  const [userInfor, setUserInfor] = useState<any>(null)
  const handleChangeForm = (login: boolean) => {
    setLoginForm(login)
  }

  const handleSignIn = (signIn: boolean) => {
    setDialogOpen(signIn)
  }
  const { state } = useAppContext()
  const { cartList } = state.cart

  const classes = useStyles()

  const cartHandle = (
    <Badge badgeContent={cartList.length} color="primary">
      <Box component={IconButton} ml={2.5} p={1.25} onClick={toggleSidenav}>
        <ShoppingCartOutlined />
      </Box>
    </Badge>
  )

  useEffect(() => {
    let user = getUserInfo()
    setUserInfor(user)
  }, [])

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
          >
            <LapstoreAvatar src={userInfor?.profile?.photo} height={30} width={30} />
            <Box ml={2}>
              <Span color="grey.600">{userInfor?.username}</Span>
            </Box>
          </FlexBox>
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

        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart />
        </Drawer>
      </Container>
    </div>
  )
}

export default Header
