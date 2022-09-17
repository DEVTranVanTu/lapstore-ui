import Image from '@Atoms/ui/LapstoreImage'
import FlexBox from '@Atoms/ui/FlexBox'
import { Span } from '@Atoms/utils/Typography'
import { useAppContext } from '@context/app/AppContext'
import { Button, IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Remove from '@material-ui/icons/Remove'
import { Box } from '@material-ui/system'
import Link from 'next/link'
import React, { useState, useCallback } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ProductCard7Style from './ProductCard7Style'

export interface ProductCard7Props {
  id: string | number
  name: string
  qty: number
  price: number
  imgUrl?: string
}

const ProductCard7: React.FC<ProductCard7Props> = ({
  id,
  name,
  qty,
  price,
  imgUrl,
}) => {
  const { dispatch } = useAppContext()
  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: 'CHANGE_CART_AMOUNT',
        payload: {
          qty: amount,
          name,
          price,
          imgUrl,
          id,
        },
      })
    },
    []
  )
  const [checked, setChecked] = useState(false)
  const handleChange = (event: any) => {
    setChecked(event.target.checked)
  }

  return (
    <ProductCard7Style>
      <FormControlLabel
        control={
          <Checkbox size={'medium'} checked={checked} onChange={handleChange} />
        }
        label=""
      />
      <Image
        src={imgUrl || '/assets/images/products/iphone-xi.png'}
        height={140}
        width={140}
        display="block"
        alt={name}
      />
      <FlexBox
        className="product-details"
        flexDirection="column"
        justifyContent="space-between"
        minWidth="0px"
        width="100%"
      >
        <Link href={`/product/${id}`}>
          <a>
            <Span className="title" fontWeight="600" fontSize="18px" mb={1}>
              {name}
            </Span>
          </a>
        </Link>
        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            size="small"
            sx={{
              padding: '4px',
              ml: '12px',
            }}
            onClick={handleCartAmountChange(0)}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
            <Span color="grey.600" mr={1}>
              ${price.toFixed(2)} x {qty}
            </Span>
            <Span fontWeight={600} color="primary.main" mr={2}>
              ${(price * qty).toFixed(2)}
            </Span>
          </FlexBox>

          <FlexBox alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              disabled={qty === 1}
              sx={{ p: '5px' }}
              onClick={handleCartAmountChange(qty - 1)}
            >
              <Remove fontSize="small" />
            </Button>
            <Span mx={1} fontWeight="600" fontSize="15px">
              {qty}
            </Span>
            <Button
              variant="outlined"
              color="primary"
              sx={{ p: '5px' }}
              onClick={handleCartAmountChange(qty + 1)}
            >
              <Add fontSize="small" />
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </ProductCard7Style>
  )
}

export default ProductCard7
