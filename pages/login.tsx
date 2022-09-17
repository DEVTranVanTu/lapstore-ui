import React from 'react'
import Login from '@Organisms/sessions/Login'
import FlexBox from '@Atoms/ui/FlexBox'

const LoginPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Login />
    </FlexBox>
  )
}

export default LoginPage
