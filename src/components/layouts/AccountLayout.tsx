import FlexBox from '@Atoms/ui/FlexBox'
import NavbarLayout from '@Layouts/NavbarLayout'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AccountSideNav from '@Molecules/sidenav/AccountSideNav'
import { FC, useEffect, useState } from 'react'
import { getUserInfo } from 'utils'
const useStyles = makeStyles(() => ({
  boxContent: {
    background: '#ffffff',
  },
  link: {
    display: 'flex',
    width: '100%',
  },
}))

const AccountLayout: FC = ({ children }) => {
  const classes = useStyles()

  const [userInfor, setUserInfor] = useState<any>(null)

  useEffect(() => {
    let user = getUserInfo()
    setUserInfor(user)
  }, [])
  return (
    <NavbarLayout>
      <FlexBox>
        <Box width={'25%'} pr={5}>
          <AccountSideNav userInfor={userInfor} />
        </Box>
        <Box width={'75%'} className={classes.boxContent}>
          {children}
        </Box>
      </FlexBox>
    </NavbarLayout>
  )
}

export default AccountLayout
