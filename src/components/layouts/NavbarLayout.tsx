import { Container } from '@material-ui/core'
import React, { ReactNode } from 'react'
import Navbar from '@Organisms/navbar/Navbar'
import AppLayout from './AppLayout'

export interface NavbarLayout {
  children: ReactNode
}

const NavbarLayout: React.FC<NavbarLayout> = ({ children }) => {
  return (
    <AppLayout navbar={<Navbar />}>
      <Container sx={{ my: '2rem' }}>{children}</Container>
    </AppLayout>
  )
}

export default NavbarLayout
