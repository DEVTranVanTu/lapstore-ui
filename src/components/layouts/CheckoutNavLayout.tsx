import { Paragraph } from '@Atoms/utils/Typography'
import { Container, Grid } from '@material-ui/core'
import { Box } from '@material-ui/system'
import Navbar from '@Organisms/navbar/Navbar'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import AppLayout from './AppLayout'

interface checkout {
  children: ReactNode
}

const CheckoutNavLayout: React.FC<checkout> = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0)

  const router = useRouter()
  const { pathname } = router

  useEffect(() => {
    switch (pathname) {
      case '/cart':
        setSelectedStep(0)
        break
      case '/checkout':
        setSelectedStep(1)
        break
      default:
        break
    }
  }, [pathname])

  return (
    <AppLayout navbar={<Navbar />}>
      <Container sx={{ my: '2rem' }}>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} xs={12}>
              <Paragraph fontSize={22} fontWeight={600} color={'#1266f1'}>
                {stepperList[selectedStep].title}
              </Paragraph>
            </Grid>
          </Grid>
        </Box>

        {children}
      </Container>
    </AppLayout>
  )
}

const stepperList = [
  {
    title: 'Giỏ hàng',
    disabled: false,
  },
  {
    title: 'Thanh toán',
    disabled: false,
  },
  {
    title: 'Đánh giá',
    disabled: true,
  },
]

export default CheckoutNavLayout
