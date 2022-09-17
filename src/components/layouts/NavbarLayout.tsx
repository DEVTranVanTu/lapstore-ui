import { Container } from '@material-ui/core'
import React from 'react'
import Navbar from '@Organisms/navbar/Navbar'
import AppLayout from './AppLayout'

const NavbarLayout: React.FC = ({ children }) => {
  return (
    <AppLayout navbar={<Navbar />}>
      <Container sx={{ my: '2rem' }}>{children}</Container>
    </AppLayout>
  )
}

export default NavbarLayout
