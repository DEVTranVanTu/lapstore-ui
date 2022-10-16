import LapstoreButton from '@Atoms/ui/LapstoreButton'
import LapstoreCard from '@Atoms/ui/LapstoreCard'
import CategoryMenu from '@Molecules/category/CategoryMenu'
import FlexBox from '@Atoms/ui/FlexBox'
import LazyImage from '@Atoms/ui/LazyImage'
import NavLink from '@Molecules/navlink/NavLink'
import { Span } from '@Atoms/utils/Typography'
import { Box, Container, Dialog } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  brandActions,
  selectBrandList,
  selectBrandLoading,
} from '../../../../store/slices/brandSlice'
import ShopInfor from '@Organisms/dialog/ShopInfor'

export interface NavbarProps {
  navListOpen?: boolean
}

const useStyles = makeStyles(({ palette }: MuiThemeProps) => ({
  navLink: {
    cursor: 'pointer',
    marginRight: '2rem',
    transition: 'color 150ms ease-in-out',
    color: '#7D879C',
    fontWeight: 600,
    '&:hover': {
      color: palette.primary.main,
    },
    '&:last-child': {
      marginRight: '0',
    },
  },
  root: {
    '&:hover': {
      '& $rootChild': {
        display: 'block',
      },
    },
  },
  rootChild: {
    display: 'none',
    position: 'absolute',
    left: 0,
    top: '100%',
    zIndex: 5,
  },
  parent: {
    '&:hover': {
      color: palette.primary.main,
      '& > $parentChild': {
        display: 'block',
      },
    },
  },
  parentChild: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: '100%',
    zIndex: 5,
  },
  categoryMenuButton: {
    width: '210px',
    height: '40px',
    px: '1rem',
  },
}))
const Navbar: React.FC<NavbarProps> = ({ navListOpen }) => {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const brands = useAppSelector(selectBrandList)
  const loading = useAppSelector(selectBrandLoading)

  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleDialog = () => setDialogOpen(!dialogOpen)

  useEffect(() => {
    dispatch(brandActions.fetchBrandList())
  }, [dispatch])

  const renderNestedNav = () => {
    return (
      <>
        {!loading &&
          brands.map((brand, i) => (
            <NavLink
              className={classes.navLink}
              href="/"
              target="_blank"
              key={i}
              rel="noopener noreferrer"
            >
              <FlexBox alignItems={'center'}>
                <Box flex="1 1 0" width="40px" height={'25px'} position="relative">
                  <LazyImage
                    layout="fill"
                    objectFit="contain"
                    src={brand.brandThumbnail}
                  />
                </Box>
                <Span ml={0.5}>{brand.brandName}</Span>
              </FlexBox>
            </NavLink>
          ))}
      </>
    )
  }

  return (
    <LapstoreCard
      elevation={2}
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'relative',
        height: '60px',
        borderRadius: '0px',
      }}
      hoverEffect={false}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <FlexBox alignItems="center">
          <CategoryMenu open={navListOpen}>
            <LapstoreButton className={classes.categoryMenuButton} variant="text">
              <Menu fontSize="small" />
              <Box
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml={1.25}
                color="grey.600"
              >
                Danh mục sản phẩm
              </Box>
              <ChevronRight className="dropdown-icon" fontSize="small" />
            </LapstoreButton>
          </CategoryMenu>

          <FlexBox ml={6}>{renderNestedNav()}</FlexBox>
        </FlexBox>
        <FlexBox>
          <Box>
            <Span className={classes.navLink} onClick={toggleDialog}>
              Liên hệ với Shop
            </Span>
          </Box>
        </FlexBox>
        <Dialog open={dialogOpen} scroll="body" onClose={toggleDialog}>
          <ShopInfor />
        </Dialog>
      </Container>
    </LapstoreCard>
  )
}

export default Navbar
