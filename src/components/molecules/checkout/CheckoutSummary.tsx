import Card1 from '@Atoms/ui/Card1'
import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { formatVND, getCartItemToPayment } from 'utils'

const CheckoutSummary = () => {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const cartItem = getCartItemToPayment()

    setTotal(cartItem.totalPrice)
  }, [])
  return (
    <Card1>
      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        mb={3}
      >
        Tổng: {formatVND(total)}
      </Typography>
    </Card1>
  )
}

export default CheckoutSummary
