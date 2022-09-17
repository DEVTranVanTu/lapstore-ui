import LapstoreCard from '@Atoms/ui/LapstoreCard'
import Carousel from '@Molecules/carousel/Carousel'
import FlexBox from '@Atoms/ui/FlexBox'
import LazyImage from '@Atoms/ui/LazyImage'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import React from 'react'

const useStyles = makeStyles(({ breakpoints }: MuiThemeProps) => ({
  root: {
    borderRadius: 8,
    overflow: 'hidden',

    '& .card__inner-box': {
      padding: '40px 0px 97px 72px',
    },

    '& .carousel-dot': {
      position: 'absolute',
      bottom: '20px',
      left: '45%',
    },

    [breakpoints.down('sm')]: {
      '& .card__inner-box': {
        padding: '1rem 1rem 4rem',
      },

      '& .carousel-dot': {
        position: 'absolute',
        bottom: '0.75rem',
        left: '1rem',
      },
    },
  },
}))

const BannerCarousel = () => {
  const ListImages = [
    {
      src: '/images/banners/img1.jpg',
    },
    {
      src: '/images/banners/img2.jpg',
    },
    {
      src: '/images/banners/img3.jpg',
    },
    {
      src: '/images/banners/img4.jpg',
    },
    {
      src: '/images/banners/img5.jpg',
    },
    {
      src: '/images/banners/img6.jpg',
    },
    {
      src: '/images/banners/img7.jpg',
    },
  ]
  return (
    <Carousel
      totalSlides={ListImages.length}
      visibleSlides={1}
      showDots={true}
      showArrow={true}
      autoPlay={true}
      dotClass="carousel-dot"
      dotColor="gray"
      spacing="0px"
    >
      {ListImages.map((image, i) => (
        <LapstoreCard
          key={i}
          sx={{
            bgcolor: 'grey.400',
            borderRadius: 0,
            position: 'relative',
          }}
        >
          <FlexBox alignItems="center" flexWrap="wrap">
            <Box flex="1 1 0" minWidth="368px" height="303px" position="relative">
              <LazyImage src={image.src} layout="fill" objectFit="fill" />
            </Box>
          </FlexBox>
        </LapstoreCard>
      ))}
    </Carousel>
  )
}

const Slides = () => {
  const classes = useStyles()

  return <Box className={classes.root}>{BannerCarousel()}</Box>
}

export default Slides
