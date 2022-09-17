import React from 'react'
import Signup from '@Organisms/sessions/Signup'
import FlexBox from '@Atoms/ui/FlexBox'

const SignUpPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Signup />
    </FlexBox>
  )
}

export default SignUpPage
