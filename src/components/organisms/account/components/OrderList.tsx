import { Box } from '@material-ui/system'
import ProductCard7Style from '@Organisms/productcart/ProductCard7Style'

import { Paragraph, Span } from '@Atoms/utils/Typography'
import Image from '@Atoms/ui/LapstoreImage'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { formatVND, getUserInfo } from 'utils'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import {
  cancelOrderActions,
  cancelOrderLoading,
  getListOrderData,
  getListOrderLoading,
  listOrderActions,
} from '../../../../../store/slices/orderSlice'
import FlexBox from '@Atoms/ui/FlexBox'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Pagination } from '@material-ui/core'
import { BorderColorOutlined, Delete } from '@material-ui/icons'

type Props = {
  filter: String
}

const useStyles = makeStyles(() => ({
  dBlock: {
    display: 'block',
  },
  item: {
    '&:not(:last-child)': {
      borderBottom: '.5px solid #7D879C',
    },
  },
  iconEdit: {
    color: '#7D879C',
  },
  paginationContent: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function OrderList({ filter }: Props) {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(getListOrderLoading)
  const list = useAppSelector(getListOrderData)

  const cancleLoading = useAppSelector(cancelOrderLoading)

  const classes = useStyles()

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    search: filter,
  })
  const handleChange = (event: any, value: number) => {
    setParams({
      page: value,
      limit: 5,
      search: filter,
    })
  }

  const mapStatus = (status: number) => {
    let text = ''
    switch (status) {
      case 0: {
        text = 'Chờ lấy hàng'
        break
      }
      case 1: {
        text = 'Đang giao'
        break
      }
      case 2: {
        text = 'Đã giao'
        break
      }
      case 3: {
        text = 'Đã hủy'
        break
      }
      default: {
        text = 'Chờ lấy hàng'
      }
    }
    return text
  }

  const cancelOrder = (id: String) => {
    dispatch(cancelOrderActions.cancelOrder(id))
  }

  const changeShippingAddress = (id: String) => {
    console.log(id)
  }

  useEffect(() => {
    let user = getUserInfo()
    const id = user?._id
    id && dispatch(listOrderActions.getListOrder({ id, params }))
  }, [params, dispatch, cancleLoading])

  return (
    <Box>
      {list?.orders?.data?.map((item: any) => (
        <ProductCard7Style key={item._id} className={classes.dBlock}>
          {item?.products.map((i: any) => (
            <FlexBox key={i.productId} width="100%" className={classes.item}>
              <Image
                src={i.productDetail.productThumbnail}
                height={140}
                width={140}
                display="block"
                alt={i.productDetail.productName}
              />
              <FlexBox
                className="product-details"
                flexDirection="column"
                justifyContent="space-between"
                minWidth="0px"
                width="100%"
              >
                <Box>
                  <FlexBox justifyContent={'space-between'}>
                    <Link href={`/product/${i.productId}`}>
                      <a>
                        <Span
                          className="title"
                          fontWeight="600"
                          fontSize="18px"
                          mb={1}
                        >
                          {i.productDetail.productName}
                        </Span>
                      </a>
                    </Link>
                    <IconButton
                      disabled={item.status === 2 || item.status === 3}
                      color="error"
                      onClick={() => cancelOrder(item._id)}
                    >
                      <Delete />
                    </IconButton>
                  </FlexBox>
                  <Paragraph color={'#1266f1'} fontWeight={600}>
                    {formatVND(i.productDetail.price)}
                  </Paragraph>

                  <FlexBox justifyContent={'space-between'}>
                    <Paragraph fontWeight="500" fontSize="15px">
                      Địa chỉ giao hàng:{' '}
                      {item?.shipping.shipping_address +
                        ', ' +
                        item?.shipping.shipping_ward?.name +
                        ', ' +
                        item?.shipping.shipping_district?.name +
                        ', ' +
                        item?.shipping.shipping_province?.name}
                    </Paragraph>
                    <IconButton
                      disabled={item.status === 2 || item.status === 3}
                      className={classes.iconEdit}
                      onClick={() => changeShippingAddress(item._id)}
                    >
                      <BorderColorOutlined fontSize="small" />
                    </IconButton>
                  </FlexBox>
                </Box>

                <FlexBox alignItems="center" justifyContent={'space-between'}>
                  <Paragraph fontWeight="600" fontSize="15px">
                    Trạng thái: {mapStatus(item.status)}
                  </Paragraph>
                  <Paragraph mx={1} fontWeight="600" fontSize="15px">
                    Số lượng: {i.quantity}
                  </Paragraph>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          ))}
        </ProductCard7Style>
      ))}
      <Pagination
        className={classes.paginationContent}
        count={list?.orders?.pagination.totalPages}
        variant="outlined"
        page={params.page}
        color="primary"
        onChange={handleChange}
      />
    </Box>
  )
}
