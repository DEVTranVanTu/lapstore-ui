import LapstoreIconButton from '@Atoms/ui/LapstoreIconButton'
import Image from '@Atoms/ui/LapstoreImage'
import Facebook from '@Atoms/icons/Facebook'
import Google from '@Atoms/icons/Google'
import Instagram from '@Atoms/icons/Instagram'
import Twitter from '@Atoms/icons/Twitter'
import { Paragraph } from '@Atoms/utils/Typography'
import Youtube from '@Atoms/icons/Youtube'
import { Box, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import Link from 'next/link'
import React from 'react'
import FlexBox from '@Atoms/ui/FlexBox'

const useStyles = makeStyles(({ palette }: MuiThemeProps) => ({
  link: {
    position: 'relative',
    display: 'block',
    padding: '0.3rem 0rem',
    color: palette.grey[500],
    cursor: 'pointer',
    borderRadius: 4,

    '&:hover': {
      color: palette.grey[100],
    },
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer>
      <Box bgcolor="#2e2e2e">
        <Container sx={{ p: '1rem', color: 'white' }}>
          <Box py={5} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image
                      mb={2.5}
                      width={'auto'}
                      height={'auto'}
                      src="/images/logoft.png"
                      alt="logo"
                    />
                  </a>
                </Link>

                <Paragraph mb={2.5} color="grey.500">
                  Chúng tôi hân hạnh đem đến cho khách hàng dịch vụ tốt nhất và những
                  sản phẩm chất lượng nhất
                </Paragraph>
                <Paragraph color="grey.500">
                  © 1999 - 2021 Công Ty Cổ Phần Thương Mại - Dịch Vụ LAP
                </Paragraph>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"
                >
                  Về chúng tôi
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <a className={classes.link}>{item}</a>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"
                >
                  Hỗ trợ khách hàng
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <a className={classes.link}>{item}</a>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"
                >
                  Thông tin liên hệ
                </Box>
                <Box py={0.6} color="grey.500">
                  Ngô Sỹ Liên, Liên Chiểu, Hòa Minh, Đà nẵng
                </Box>
                <Box py={0.6} color="grey.500">
                  Email: d38tranvantu@gmail.com
                </Box>
                <Box py={0.6} mb={2} color="grey.500">
                  Phone: +84 396 698 025
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <LapstoreIconButton
                        m={0.5}
                        bgcolor="rgba(0,0,0,0.2)"
                        fontSize="12px"
                        padding="10px"
                      >
                        <item.icon fontSize="inherit" />
                      </LapstoreIconButton>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}

const aboutLinks = [
  'Thông tin về shop',
  'Thông tin liên hệ',
  'Hỏi đáp',
  'Tin công nghệ',
  'Hệ thống của hàng',
]

const customerCareLinks = [
  'Thẻ ưu đãi',
  'Trung tâm bảo hành',
  'Thanh toán và giao hàng',
  'Dịch vụ sửa chữa và bảo trì',
]

const iconList = [
  { icon: Facebook, url: 'https://www.facebook.com/' },
  { icon: Twitter, url: 'https://twitter.com/' },
  {
    icon: Youtube,
    url: 'https://www.youtube.com/',
  },
  { icon: Google, url: '/' },
  { icon: Instagram, url: 'https://www.instagram.com/' },
]

export default Footer
