import LapstoreCard from '@Atoms/ui/LapstoreCard'
import FlexBox from '@Atoms/ui/FlexBox'
import HoverBox from '@Organisms/hoverbox/HoverBox'
import LazyImage from '@Atoms/ui/LazyImage'
import { H6, Span } from '@Atoms/utils/Typography'
import { SxProps } from '@material-ui/system'
import Link from 'next/link'
import React from 'react'

export interface ProductCard8Props {
  id: string
  imgUrl: string
  price: number
  title: string
  sx: SxProps
}

const ProductCard8: React.FC<ProductCard8Props> = ({
  id,
  imgUrl,
  price,
  title,
  sx = {},
}) => {
  return (
    <LapstoreCard sx={{ p: '1rem', ...sx }}>
      <Link href={`/product/${id}`}>
        <a>
          <HoverBox mb={1.5} borderRadius="8px">
            <LazyImage
              src={imgUrl || '/assets/images/products/Rectangle 116.png'}
              borderRadius="8px"
              height={500}
              width={500}
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
            />
          </HoverBox>
          <Span title={title} mb={0.5} color="inherit" ellipsis display="block">
            {title}
          </Span>
          <FlexBox alignItems="center">
            <H6 color="primary.main" mr={0.5}>
              ${price}
            </H6>
            <Span color="grey.600">
              <del>$1600</del>
            </Span>
          </FlexBox>
        </a>
      </Link>
    </LapstoreCard>
  )
}

export default ProductCard8
