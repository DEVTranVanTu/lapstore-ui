import FlexBox from '@Atoms/ui/FlexBox'
import { H3, H4, Paragraph, Span } from '@Atoms/utils/Typography'
import { EmailOutlined, Phone } from '@material-ui/icons'
import { Box } from '@material-ui/system'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { listAdmin, listAdminActions } from '../../../../store/slices/userSlice'

export default function ShopInfor() {
  const dispatch = useAppDispatch()
  const admins = useAppSelector(listAdmin)
  console.log(admins)

  useEffect(() => {
    dispatch(listAdminActions.getListAdmin())
  }, [])
  return (
    <Box p={5}>
      <H3>Thông tin những quản lý của cửa hàng</H3>
      <Paragraph mt={1}>
        Mọi thắc mắc xin vui lòng liên hệ với quản lý để được giải đáp.
      </Paragraph>
      <Box mt={2}>
        {admins.map((admin) => (
          <Box key={admin._id} mt={2}>
            <H4>
              Quản lý cửa hàng <Span color={'#417CE9'}>{admin.username}</Span>
            </H4>
            <FlexBox ml={2}>
              <FlexBox mt={1}>
                <EmailOutlined />
                <Span ml={1}>{admin.email}</Span>
              </FlexBox>
            </FlexBox>
            <FlexBox ml={2} mt={1}>
              <Phone />
              <Span ml={1}>{admin.profile.phoneNumber}</Span>
            </FlexBox>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
