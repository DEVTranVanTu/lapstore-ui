import { Box, Container, Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

import recommendNavigation from '@data/recommendNavigation'
import Slides from '@Molecules/slider/Slides'
import RecommendedMenu from '@Molecules/menu/RecommendedMenu'
import { H6 } from '@Atoms/utils/Typography'
import LazyImage from '@Atoms/ui/LazyImage'

const useStyles = makeStyles(() => ({
  root: () => ({
    boxShadow: '0 10px 20px 0 rgb(0 0 0 / 5%)',
    borderRadius: '0.375rem',
    background: '#fff',
    '& .banner': {
      cursor: 'pointer',
      transition: 'all .3s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  }),
}))

const BannerSlide = () => {
  const classes = useStyles()

  return (
    <Box pt={0.5} mt={1.5}>
      <Container sx={{ py: '2rem' }} className={classes.root}>
        <Box display={'flex'} flex="1 1 auto" padding={'1.25rem'}>
          <Grid container columnSpacing={5}>
            <Grid item md={3} lg={2} xl={2}>
              <Box>
                <H6
                  fontWeight={'500'}
                  color={'#4f4f4f'}
                  fontSize={'1rem'}
                  padding={0}
                  mb={'0.5rem'}
                >
                  DÀNH CHO BẠN
                </H6>
                {recommendNavigation.map((item) => {
                  return (
                    <RecommendedMenu
                      title={item.title}
                      href={item.href}
                      key={item.title}
                    ></RecommendedMenu>
                  )
                })}
              </Box>
            </Grid>
            <Grid item md={6} lg={7} xl={7}>
              <Slides />
            </Grid>
            <Grid
              item
              md={3}
              rowSpacing={'auto'}
              display={'flex'}
              flexDirection={'column'}
              rowGap={'20px'}
            >
              <Box flex="1 1 0" width="100%" position="relative">
                <LazyImage
                  className="banner"
                  layout="fill"
                  objectFit="fill"
                  src="/images/banners/banner1.png"
                />
              </Box>
              <Box flex="1 1 0" width="100%" position="relative">
                <LazyImage
                  className="banner"
                  layout="fill"
                  objectFit="fill"
                  src="/images/banners/banner2.png"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default BannerSlide
