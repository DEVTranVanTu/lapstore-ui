import { Paragraph, Span } from '@Atoms/utils/Typography'
import { Box } from '@material-ui/core'
import { Notification } from '@Models/notification'
import { Assignment, Delete } from '@material-ui/icons'

import React from 'react'
import FlexBox from '@Atoms/ui/FlexBox'
import { makeStyles } from '@material-ui/styles'
import { formatDay } from 'utils'
import router from 'next/router'
import { useAppDispatch } from '../../../../store/hooks'
import { editNotificationActions } from '../../../../store/slices/notificationSlice'

type Props = {
  data: Notification[]
  onDeleteNotification: Function
}

const useStyles = makeStyles(() => ({
  row: {
    justifyContent: 'space-between',
    color: '#666',
    '&:not(:last-child)': {
      borderBottom: '1px solid #ECEDF3',
    },
  },
  rowActive: {
    color: '#417CE9',
  },
  notificationInfo: {
    display: 'blok',
  },
  deleteIcon: {
    marginLeft: '5px',
    color: '#666',
    cursor: 'pointer',
    textAlign: 'right',
  },
  link: {
    cursor: 'pointer',
    color: '#417CE9',
    fontWeight: 300,
    textDecoration: 'underline',
  },
  linkActive: {
    fontWeight: 500,
  },
}))

export default function NotificationHeader({ data, onDeleteNotification }: Props) {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const onViewNotification = () => {
    dispatch(editNotificationActions.editNotification('unactive'))
    router.push('/account/orders')
  }
  return (
    <Box padding={2}>
      {data.length > 0 && data[0]._id ? (
        <>
          {data?.map((notification, i) => (
            <FlexBox
              key={i}
              alignItems="center"
              padding={1}
              className={
                notification.status === 'active'
                  ? classes.row + ' ' + classes.rowActive
                  : classes.row
              }
            >
              <FlexBox>
                {notification.typeOfNotification === 'order' && <Assignment />}
                <Box className={classes.notificationInfo}>
                  <Paragraph ml={2}>
                    {notification.message}
                    <Span color={'#AFAFBE'} pl={1}>
                      ( {formatDay(notification.createdAt)} )
                    </Span>
                  </Paragraph>
                  <Paragraph mt={1} color="#666">
                    <Span ml={2}>#{notification.idToReview}</Span>
                    <Span
                      onClick={onViewNotification}
                      ml={2}
                      className={
                        notification.status === 'active'
                          ? classes.link + ' ' + classes.linkActive
                          : classes.link
                      }
                    >
                      Xem đơn hàng
                    </Span>
                  </Paragraph>
                </Box>
              </FlexBox>
              <Delete
                className={classes.deleteIcon}
                onClick={() => onDeleteNotification(notification._id)}
              />
            </FlexBox>
          ))}
        </>
      ) : (
        <Box>
          <Paragraph color={'#666'}>Bạn chưa có thông báo nào</Paragraph>
        </Box>
      )}
    </Box>
  )
}
