import LazyImage from '@Atoms/ui/LazyImage'
import { Card } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React from 'react'
import { H4, Span } from '@Atoms/utils/Typography'
import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreRating from '@Molecules/rating/LapstoreRating'
import { makeStyles } from '@material-ui/styles'
import { topProduct } from '@Models/product'
export interface TopSellingProps {
  product: topProduct
}

const useStyles = makeStyles(() => ({
  root: () => ({
    '& .image-product': {
      transition: 'all .3s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    '& .product-name': {
      transition: 'all .2s',
      '&:hover': {
        color: '#1266f1',
        textDecoration: 'underline',
      },
    },
  }),
}))

const TopSelling: React.FC<TopSellingProps> = ({ product }) => {
  const classes = useStyles()

  return (
    <Card sx={{ position: 'relative' }}>
      <Box p={'20px'} className={classes.root}>
        <Box position="relative" height="150px" borderRadius="8px">
          <LazyImage
            className="image-product"
            src={product.productDetail?.productThumbnail}
            layout="fill"
            objectFit="cover"
            borderRadius="8px"
          />
        </Box>
        <Box mt={5}>
          <H4
            className="product-name"
            color={'#6c757d'}
            textOverflow={'ellipsis'}
            height={30}
            lineHeight={'15px'}
            fontSize={'14px'}
            overflow={'hidden'}
            whiteSpace={'normal'}
            mb={2}
          >
            {product.productDetail?.productName}
          </H4>
          <Span height={20} mt={3} fontWeight={'600'}>
            {product.productDetail?.price}&nbsp;đ
          </Span>
          <FlexBox
            height={30}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <LapstoreRating value={product.rating | 0} color="warn" readOnly />
            <Span fontSize={'12px'}>Đã bán:&nbsp;{product.quantity}</Span>
          </FlexBox>
        </Box>
      </Box>
    </Card>
  )
}

export default TopSelling
