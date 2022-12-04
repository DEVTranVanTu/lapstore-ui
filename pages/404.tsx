import LapstoreImage from '@Atoms/ui/LapstoreImage'
import FlexBox from '@Atoms/ui/FlexBox'
import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { H2, H3 } from '@Atoms/utils/Typography'
import { Box } from '@material-ui/system'

const Error404 = () => {
  return (
    <FlexBox minHeight="100vh" alignItems="center">
      <LapstoreImage
        src="/images/banners/img6.jpg"
        sx={{
          display: 'block',
          maxWidth: '800px',
          height: '100vh',
          objectFit: 'cover',
        }}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection="column"
        width={'100%'}
      >
        <H2 fontSize={'60px'} color={'red'}>
          404
        </H2>
        <H3 marginBottom={2}>Không tìm thấy trang bạn muốn tìm !</H3>
        <FlexBox flexWrap="wrap">
          <Link href="/">
            <Button variant="outlined" color="primary" sx={{ m: '0.5rem' }}>
              Quay lại
            </Button>
          </Link>
        </FlexBox>
      </Box>
    </FlexBox>
  )
}

export default Error404
