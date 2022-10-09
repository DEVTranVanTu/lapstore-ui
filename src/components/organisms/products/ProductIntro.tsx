import LapstoreAvatar from '@Atoms/ui/LapstoreAvatar'
import LapstoreButton from '@Atoms/ui/LapstoreButton'
import LapstoreRating from '@Molecules/rating/LapstoreRating'
import LazyImage from '@Atoms/ui/LazyImage'
import { H1, H2, H6, Span } from '@Atoms/utils/Typography'
import { Box, Button, Grid } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import React, { Fragment, useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import FlexBox from '@Atoms/ui/FlexBox'
import { formatVND } from 'utils'
import { Product } from '@Models/product'

export interface ProductIntroProps {
  productDetail: Product
  imgUrl?: string[]
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  productDetail,
  imgUrl = [],
}) => {
  const { productName, productThumbnail, rating, price, quantity, comment } =
    productDetail
  const [selectedImage, setSelectedImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const [amount, setAmount] = useState(0)

  const handleImageClick = (ind: number) => () => {
    setSelectedImage(ind)
  }

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const handleCartAmountChange = () => {}

  const increaseAmount = () => {
    if (amount < 100) {
      setAmount(amount + 1)
    }
  }

  const decreaseAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb={6}>
              <LazyImage
                src={
                  productThumbnail
                    ? productThumbnail
                    : 'https://firebasestorage.googleapis.com/v0/b/lapstore-1de36.appspot.com/o/no-image.png?alt=media&token=66c374e3-a264-426a-b4ee-ec261b7a7399'
                }
                onClick={() =>
                  openImageViewer(imgUrl.indexOf(imgUrl[selectedImage]))
                }
                alt={productName}
                height="300px"
                width="auto"
                loading="eager"
                objectFit="contain"
              />
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
              ({comment})
            </H6>
            <Span> Đánh giá</Span>
          </FlexBox>

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {formatVND(price)}
            </H2>
          </Box>

          <Box alignItems="center" mb={2}>
            <Span>Còn lại:</Span>
            <Span ml={1}>{quantity}</Span>
          </Box>

          <FlexBox className="add-cart" alignItems="center" mb={2}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ padding: '3px' }}
              onClick={increaseAmount}
            >
              <Add fontSize="small" />
            </Button>

            <Fragment>
              <Box m={2} color="text.primary" fontWeight="600">
                {amount}
              </Box>
              <Button
                variant="outlined"
                color="primary"
                sx={{ padding: '3px' }}
                onClick={decreaseAmount}
              >
                <Remove fontSize="small" />
              </Button>
            </Fragment>
          </FlexBox>

          <LapstoreButton
            variant="contained"
            color="primary"
            sx={{
              mb: '36px',
              px: '1.75rem',
              height: '40px',
            }}
            onClick={handleCartAmountChange}
          >
            Thêm vào giỏ hàng
          </LapstoreButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductIntro
