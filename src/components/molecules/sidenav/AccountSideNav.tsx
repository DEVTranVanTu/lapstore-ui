import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreAvatar from '@Atoms/ui/LapstoreAvatar'
import { Span } from '@Atoms/utils/Typography'
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@material-ui/core'
import { LocalMall, Notifications, Person } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import Link from 'next/link'
import React from 'react'

type Props = {
  userInfor: any
}

const useStyles = makeStyles(() => ({
  link: {
    display: 'flex',
    width: '100%',
  },
}))

export default function AccountSideNav({ userInfor }: Props) {
  const classes = useStyles()
  return (
    <Box>
      <FlexBox alignItems="center" p={1.25}>
        <LapstoreAvatar src={userInfor?.profile?.photo} height={40} width={40} />
        <Box ml={2}>
          <Span color="grey.600" fontSize={'16px'}>
            {userInfor?.username}
          </Span>
        </Box>
      </FlexBox>
      <Divider />
      <Box>
        <MenuList>
          <MenuItem>
            <Link href={'/account/profile'}>
              <a className={classes.link}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={'/account/notification'}>
              <a className={classes.link}>
                <ListItemIcon>
                  <Notifications fontSize="small" />
                </ListItemIcon>
                <ListItemText>Notification</ListItemText>
              </a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={'/account/orders'}>
              <a className={classes.link}>
                <ListItemIcon>
                  <LocalMall fontSize="small" />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </a>
            </Link>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  )
}
