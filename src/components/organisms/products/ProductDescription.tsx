import FlexBox from '@Atoms/ui/FlexBox'
import { H3, Span } from '@Atoms/utils/Typography'
import { Box } from '@material-ui/core'
import { spec } from '@Models/product'
import React from 'react'

export interface ProductDescriptionProps {
  specs: spec[]
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ specs }) => {
  return (
    <Box width={'70%'}>
      <H3 mb={2}>Thông tin chi tiết:</H3>
      <Box>
        {specs.map((spec, index) => (
          <FlexBox
            key={index}
            bgcolor={index % 2 === 0 ? '#ffffff' : 'rgb(246, 246, 246)'}
            p={'12px 16px'}
          >
            <Span width={'30%'}>{spec.key}</Span>
            <Span>{spec.value}</Span>
          </FlexBox>
        ))}
      </Box>
    </Box>
  )
}

export default ProductDescription
