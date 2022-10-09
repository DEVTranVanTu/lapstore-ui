import FlexBox from '@Atoms/ui/FlexBox'
import { H5, H6, Span } from '@Atoms/utils/Typography'
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Rating,
  TextField,
} from '@material-ui/core'
import React from 'react'

const ProductFilterCard = () => {
  return (
    <Card sx={{ p: '18px 27px', overflow: 'auto' }} elevation={1}>
      <H6 mb={2}>Price Range</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number" size="small" fullWidth />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField placeholder="250" type="number" size="small" fullWidth />
      </FlexBox>

      <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Screen Size</H6>
      {screenSize.map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Span color="inherit">{item} Inch</Span>}
          sx={{ display: 'flex' }}
          key={item}
        />
      ))}

      <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>RAM</H6>
      {ram.map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Span color="inherit">{item} GB</Span>}
          sx={{ display: 'flex' }}
          key={item}
        />
      ))}

      <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{ display: 'flex' }}
          key={item}
        />
      ))}

      {/* <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2}>
        {colorList.map((item) => (
          <Box
            sx={{
              bgcolor: item,
              height: '25px',
              width: '25px',
              mr: '10px',
              borderRadius: 300,
              cursor: 'pointer',
            }}
            key={item}
          />
        ))}
      </FlexBox> */}
    </Card>
  )
}

const screenSize = ['12"', '12.3"', '13,3"', '14"', '15,6"']
const ram = [4, 8, 16, 32]
const brandList = ['Maccs', 'Karts', 'Baars', 'Bukks', 'Luasis']
const otherOptions = ['On Sale', 'In Stock', 'Featured']
const colorList = ['#1C1C1C', '#FF7A7A', '#FFC672', '#84FFB5', '#70F6FF', '#6B7AFF']

export default ProductFilterCard
