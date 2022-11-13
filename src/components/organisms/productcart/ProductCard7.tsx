import Image from '@Atoms/ui/LapstoreImage'
import FlexBox from '@Atoms/ui/FlexBox'
import { Paragraph, Span } from '@Atoms/utils/Typography'
import { Button, IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Remove from '@material-ui/icons/Remove'
import { Box } from '@material-ui/system'
import Link from 'next/link'
import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ProductCard7Style from './ProductCard7Style'
import { Product } from '@Models/product'
import { formatVND, getUserInfo, linkToName } from 'utils'
import { useAppDispatch } from '../../../../store/hooks'
import { addToCartActions } from '../../../../store/slices/cartSlice'

export interface ProductCard7Props {
  cartId?: String
  products: {
    product: Product
    quantity: number
  }
  selectCartItem: Function
  removeCartItem: Function
}

const ProductCard7: React.FC<ProductCard7Props> = ({
  products,
  selectCartItem,
  cartId,
  removeCartItem,
}) => {
  const dispatch = useAppDispatch()

  const handleRemoveCartIten = () => {
    const dataRemove = {
      cart: cartId,
      products: [
        {
          productId: products.product._id,
          quantity: products.quantity,
        },
      ],
    }
    removeCartItem(dataRemove)
  }
  const handleCartAmountChange = (inc: Boolean) => {
    let user = getUserInfo()
    const id = user?._id

    const data = {
      userId: id,
      productId: products.product._id || '',
      quantity: inc ? products.quantity + 1 : products.quantity - 1,
    }
    dispatch(addToCartActions.addToCart(data))
  }
  const [checked, setChecked] = useState(false)
  const handleChange = (event: any) => {
    setChecked(event.target.checked)
    const data = {
      productId: products.product._id,
      price: products.product.price,
      productThumbnail: products.product.productThumbnail,
      productName: products.product.productName,
      quantity: products.quantity,
    }
    selectCartItem(data)
  }

  return (
    <ProductCard7Style>
      <FormControlLabel
        className="checkbox"
        control={
          <Checkbox size={'medium'} checked={checked} onChange={handleChange} />
        }
        label=""
      />
      <Image
        src={products.product.productThumbnail}
        height={140}
        width={140}
        display="block"
        alt={products.product.productName}
      />
      <FlexBox
        className="product-details"
        flexDirection="column"
        justifyContent="space-between"
        minWidth="0px"
        width="100%"
      >
        <Box>
          <Link
            href={`/product/${linkToName(products.product.productName)}-sku.${
              products.product._id
            }`}
          >
            <a>
              <Span fontWeight="600" fontSize="18px" mb={1}>
                {products.product.productName}
              </Span>
            </a>
          </Link>
          <Paragraph color={'#1266f1'} fontWeight={600}>
            {formatVND(products.product.price)}
          </Paragraph>
        </Box>
        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            size="small"
            sx={{
              padding: '4px',
              ml: '12px',
            }}
            onClick={handleRemoveCartIten}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
            <Span color="grey.600" mr={1}></Span>
            <Span fontWeight={600} color="primary.main" mr={2}></Span>
          </FlexBox>

          <FlexBox alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              disabled={products.quantity === 1}
              sx={{ p: '5px' }}
              onClick={() => handleCartAmountChange(false)}
            >
              <Remove fontSize="small" />
            </Button>
            <Span mx={1} fontWeight="600" fontSize="15px">
              {products.quantity}
            </Span>
            <Button
              variant="outlined"
              color="primary"
              sx={{ p: '5px' }}
              onClick={() => handleCartAmountChange(true)}
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
