import LapstoreCard from '@Atoms/ui/LapstoreCard'
import LazyImage from '@Atoms/ui/LazyImage'
import { H3 } from '@Atoms/utils/Typography'
import { Box, Chip, Dialog, DialogContent, IconButton } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import { CSSProperties, makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import FlexBox from '@Atoms/ui/FlexBox'
import ProductIntro from '../products/ProductIntro'

export interface ProductCardReviewProps {
  className?: string
  style?: CSSProperties
  rating?: number
  hoverEffect?: boolean
  imgUrl: string
  title: string
  price: number
  off?: number
  id: string | number
}

const useStyles = makeStyles(({ palette, ...theme }: MuiThemeProps) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    margin: 'auto',
    overflow: 'hidden',
    transition: 'all 250ms ease-in-out',
    borderRadius: '8px',

    '&:hover': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },

    '@media only screen and (max-width: 768px)': {
      '& $imageHolder': {
        '& .extra-icons': {
          display: 'flex',
        },
      },
    },
  },
  imageHolder: {
    position: 'relative',
    display: 'inlin-block',
    textAlign: 'center',

    '& .extra-icons': {
      display: 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '7px',
      right: '15px',
      cursor: 'pointer',
      zIndex: 2,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  offerChip: {
    position: 'absolute',
    fontSize: '10px',
    fontWeight: 600,
    paddingLeft: 3,
    paddingRight: 3,
    top: '10px',
    left: '10px',
  },
  details: {
    padding: '1rem',

    '& .title, & .categories': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '& .icon-holder': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  },
  dialogContent: {
    paddingBottom: '1.25rem',
  },
}))

const ProductCardReview: React.FC<ProductCardReviewProps> = ({
  id,
  imgUrl,
  title,
  price,
  off = 0,
  hoverEffect,
}) => {
  const [open, setOpen] = useState(false)

  const classes = useStyles({ hoverEffect })

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  return (
    <LapstoreCard className={classes.root} hoverEffect={hoverEffect}>
      <div className={classes.imageHolder}>
        {!!off && (
          <Chip
            className={classes.offerChip}
            color="primary"
            size="small"
            label={`${off}% off`}
          />
        )}

        <div className="extra-icons">
          <IconButton sx={{ p: '6px' }} onClick={toggleDialog}>
            <RemoveRedEye color="secondary" fontSize="small" />
          </IconButton>
        </div>

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imgUrl}
              layout="responsive"
              width="100%"
              height="auto"
              alt={title}
            />
          </a>
        </Link>
      </div>

      <div className={classes.details}>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/product/${id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  mb={1}
                  title={title}
                >
                  {title}
                </H3>
              </a>
            </Link>
          </Box>
        </FlexBox>
      </div>

      <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
        <DialogContent className={classes.dialogContent}>
          <ProductIntro imgUrl={[imgUrl]} title={title} price={price} />
          <IconButton
            sx={{ position: 'absolute', top: '0', right: '0' }}
            onClick={toggleDialog}
          >
            <Close className="close" fontSize="small" color="primary" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </LapstoreCard>
  )
}

ProductCardReview.defaultProps = {
  id: '324321',
  title: 'ASUS ROG Strix G15',
  imgUrl: '/assets/images/products/macbook.png',
  price: 450,
  rating: 0,
  off: 20,
}

export default ProductCardReview
