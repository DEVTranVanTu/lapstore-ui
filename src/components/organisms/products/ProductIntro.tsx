import LapstoreAvatar from '@Atoms/ui/LapstoreAvatar'
import LapstoreButton from '@Atoms/ui/LapstoreButton'
import LapstoreRating from '@Molecules/rating/LapstoreRating'
import LazyImage from '@Atoms/ui/LazyImage'
import { H1, H2, H3, H6, Span } from '@Atoms/utils/Typography'
import { useAppContext } from '@context/app/AppContext'
import { Box, Button, Grid } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import { CartItem } from '@reducer/cartReducer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import FlexBox from '@Atoms/ui/FlexBox'

export interface ProductIntroProps {
  title?: string
  imgUrl?: string[]
  productName: string
  productThumbnail: string
  rating?: number
  discount?: number
  price: number
  id?: string | number
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  title,
  imgUrl = [],
  productName,
  productThumbnail,
  rating,
  discount,
  price = 200,
  id,
}) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const { state, dispatch } = useAppContext()
  const cartList: CartItem[] = state.cart.cartList
  const router = useRouter()
  const routerId = router.query.id as string
  const cartItem = cartList.find((item) => item.id === id || item.id === routerId)

  const handleImageClick = (ind: number) => () => {
    setSelectedImage(ind)
  }

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: 'CHANGE_CART_AMOUNT',
        payload: {
          qty: amount,
          name: productName,
          price,
          imgUrl: imgUrl[0],
          id: id || routerId,
        },
      })
    },
    []
  )

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb={6}>
              {/* <LazyImage
                src={productThumbnail || ''}
                onClick={() =>
                  openImageViewer(imgUrl.indexOf(imgUrl[selectedImage]))
                }
                alt={productName}
                height="300px"
                width="auto"
                loading="eager"
                objectFit="contain"
              /> */}
              {isViewerOpen && (
                <ImageViewer
                  src={imgUrl}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                  }}
                />
              )}
            </FlexBox>
            <FlexBox overflow="auto">
              {imgUrl?.map((url, ind) => (
                <Box
                  height={64}
                  width={64}
                  minWidth={64}
                  bgcolor="white"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid"
                  style={{ cursor: 'pointer' }}
                  ml={ind === 0 ? 'auto' : 0}
                  mr={ind === imgUrl.length - 1 ? 'auto' : '10px'}
                  borderColor={selectedImage === ind ? 'primary.main' : 'grey.400'}
                  onClick={handleImageClick(ind)}
                  key={ind}
                >
                  <LapstoreAvatar src={url} variant="square" height={40} />
                </Box>
              ))}
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{productName}</H1>

          <FlexBox alignItems="center" mb={2}>
            <Box mr={1} lineHeight="1">
              <LapstoreRating
                color="warn"
                fontSize="1.25rem"
                value={rating}
                readOnly
              />
            </Box>
            <H6 mr={1} lineHeight="1">
              (50)
            </H6>
            <Span> Đánh giá</Span>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box>Thương hiệu:</Box>
            <Span ml={1}>Xiaomi</Span>
          </FlexBox>

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              ${price.toFixed(2)}
            </H2>
          </Box>

          <FlexBox className="add-cart" alignItems="center" mb={2}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ padding: '3px' }}
              // onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            >
              <Add fontSize="small" />
            </Button>

            <Fragment>
              <Box m={2} color="text.primary" fontWeight="600">
                0
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
          </FlexBox>

          {!cartItem?.qty ? (
            <LapstoreButton
              variant="contained"
              color="primary"
              sx={{
                mb: '36px',
                px: '1.75rem',
                height: '40px',
              }}
              onClick={handleCartAmountChange(1)}
            >
              Thêm vào giỏ hàng
            </LapstoreButton>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <LapstoreButton
                sx={{ p: '9px' }}
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </LapstoreButton>
              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, '0')}
              </H3>
              <LapstoreButton
                sx={{ p: '9px' }}
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </LapstoreButton>
            </FlexBox>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductIntro
