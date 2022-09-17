import LapstoreCard from '@Atoms/ui/LapstoreCard'
import LapstoreRating from '@Molecules/rating/LapstoreRating'
import LazyImage from '@Atoms/ui/LazyImage'
import { H3 } from '@Atoms/utils/Typography'
import { useAppContext } from '@context/app/AppContext'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Remove from '@material-ui/icons/Remove'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import { CSSProperties, makeStyles } from '@material-ui/styles'
import { CartItem } from '@reducer/cartReducer'
import { MuiThemeProps } from '@Atoms/themes/theme'
import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import FlexBox from '@Atoms/ui/FlexBox'
import ProductIntro from '../products/ProductIntro'
import { linkToName } from 'utils'

export interface ProductCardDetailProps {
  className?: string
  style?: CSSProperties
  hoverEffect?: boolean
  productName: string
  productThumbnail: string
  description: string
  price: number
  rating: number
  discount: number
  status: number
  quantity: number
  _id?: string | number
}

const useStyles = makeStyles(({ palette, ...theme }: MuiThemeProps) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    margin: 'auto',
    overflow: 'hidden',
    transition: 'all 250ms ease-in-out',
    borderRadius: '8px',

    '&:hover': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },

    '@media only screen and (max-width: 768px)': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },
  },
  imageHolder: {
    position: 'relative',
    display: 'inlin-block',
    textAlign: 'center',

    '& .extra-icons': {
      display: 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '7px',
      right: '15px',
      cursor: 'pointer',
      zIndex: 2,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  offerChip: {
    position: 'absolute',
    fontSize: '10px',
    fontWeight: 600,
    paddingLeft: 3,
    paddingRight: 3,
    top: '10px',
    left: '10px',
  },
  details: {
    padding: '1rem',

    '& .title, & .categories': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '& .icon-holder': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    '& .favorite-icon': {
      cursor: 'pointer',
    },
  },
  dialogContent: {
    paddingBottom: '1.25rem',
  },
}))

const ProductCardDetail: React.FC<ProductCardDetailProps> = ({
  _id,
  productThumbnail,
  productName,
  price,
  description,
  discount,
  status,
  quantity,
  rating,
  hoverEffect,
}) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [open, setOpen] = useState(false)

  const classes = useStyles({ hoverEffect })
  const { state, dispatch } = useAppContext()
  const cartItem: CartItem | undefined = state.cart.cartList.find(
    (item) => item.id === _id
  )

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const toggleIsFavorite = async () => {
    setIsFavorite((fav) => !fav)
  }

  // const handleCartAmountChange = useCallback(
  //   (amount) => () => {
  //     dispatch({
  //       type: 'CHANGE_CART_AMOUNT',
  //       payload: {
  //         name: productName,
  //         qty: quantity,
  //         price,
  //         productThumbnail,
  //         id,
  //       },
  //     })

  //   },
  //   []
  // )

  return (
    <LapstoreCard className={classes.root} hoverEffect={hoverEffect}>
      <div className={classes.imageHolder}>
        {!!discount && (
          <Chip
            className={classes.offerChip}
            color="primary"
            size="small"
            label={`${discount}% off`}
          />
        )}

        <div className="extra-icons">
          <IconButton sx={{ p: '6px' }} onClick={toggleDialog}>
            <RemoveRedEye color="secondary" fontSize="small" />
          </IconButton>
          <IconButton sx={{ p: '6px' }} onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
        </div>

        <Link href={`/product/${linkToName(productName)}-sku.${_id}`}>
          <a>
            <LazyImage
              src={productThumbnail}
              width="100%"
              height="auto"
              layout="responsive"
              alt={productName}
            />
          </a>
        </Link>
      </div>

      <div className={classes.details}>
        <Box>
          <Box height="40px">
            <Link href={`/product/${linkToName(productName)}-sku.${_id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  title={productName}
                >
                  {productName}
                </H3>
              </a>
            </Link>
          </Box>

          <FlexBox height="70px">
            <Box flex="1 1 0" minWidth="0px" mr={1}>
              <FlexBox alignItems="center">
                <LapstoreRating value={rating || 0} color="warn" readOnly />
                <Box fontSize="12px" ml="5px">
                  (20)
                </Box>
              </FlexBox>
              <Box alignItems="center" mt={0.5}>
                <Box pr={1} fontWeight="600" color="primary.main">
                  {price - (price * discount) / 100} đ
                </Box>
                {!!discount && (
                  <Box color="grey.600" fontWeight="600">
                    <del>{price} đ</del>
                  </Box>
                )}
              </Box>
            </Box>

            <FlexBox
              className="add-cart"
              flexDirection="column-reverse"
              alignItems="center"
              justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}
              width="30px"
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{ padding: '3px' }}
                // onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
              >
                <Add fontSize="small" />
              </Button>

              {!!cartItem?.qty && (
                <Fragment>
                  <Box color="text.primary" fontWeight="600">
                    {cartItem?.qty}
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ padding: '3px' }}
                    // onClick={handleCartAmountChange(cartItem?.qty - 1)}
                  >
                    <Remove fontSize="small" />
                  </Button>
                </Fragment>
              )}
            </FlexBox>
          </FlexBox>
        </Box>
      </div>

      <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
        <DialogContent className={classes.dialogContent}>
          <ProductIntro
            imgUrl={[productThumbnail]}
            productName={productName}
            productThumbnail={productThumbnail}
            price={price}
            rating={rating}
          />
          <IconButton
            sx={{ position: 'absolute', top: '0', right: '0' }}
            onClick={toggleDialog}
          >
            <Close className="close" fontSize="small" color="primary" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </LapstoreCard>
  )
}

ProductCardDetail.defaultProps = {
  productName: 'ASUS ROG Strix G15',
  productThumbnail: '/assets/images/products/macbook.png',
  price: 450,
  rating: 0,
  discount: 20,
}
export default ProductCardDetail
