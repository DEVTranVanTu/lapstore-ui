import useWindowSize from '@Atoms/hooks/useWindowSize'
import FlexBox from '@Atoms/ui/FlexBox'
import { H5, Paragraph } from '@Atoms/utils/Typography'
import NavbarLayout from '@Layouts/NavbarLayout'
import { Card, Grid, IconButton, MenuItem, TextField } from '@material-ui/core'
import { Apps, FilterList } from '@material-ui/icons'
import { Box } from '@material-ui/system'
import Sidenav from '@Molecules/sidenav/Sidenav'
import ProductCard1List from '@Organisms/products/ProductCard1List'
import ProductFilterCard from '@Organisms/products/ProductFilterCard'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  productBySubActions,
  selectProductListBySub,
  selectProductLoadingBySub,
} from '../../../store/slices/productBySubSlice'

export default function ProductSearchResult() {
  const [view, setView] = useState('grid')
  const width = useWindowSize()
  const isTablet = width < 1024

  const toggleView = useCallback(
    (v: string) => () => {
      setView(v)
    },
    []
  )

  const dispatch = useAppDispatch()

  const router = useRouter()

  const id: string = String(router.query.id)?.split('.', -1)[1]
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState('lowToHigh')

  const [params, setParams] = useState({
    page: 1,
    limit: 8,
    sort: sort,
    filters: {},
  })
  const handleChange = (event: any, value: number) => {
    setParams({
      page: value,
      limit: 8,
      sort: sort,
      filters: filters,
    })
  }

  const products = useAppSelector(selectProductListBySub)
  const loading = useAppSelector(selectProductLoadingBySub)

  const handleFilterData = (value: any) => {
    setFilters(value)
  }
  useEffect(() => {
    setParams({
      ...params,
      sort: sort,
      filters: filters,
    })
  }, [filters, sort])

  useEffect(() => {
    const timer = setTimeout(() => {
      id && dispatch(productBySubActions.fetchProductListBySub({ id, params }))
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [dispatch, id, params])

  const searchBy = router.query.id
    ?.slice(0, router.query.id?.lastIndexOf('-'))
    .toString()
    ?.replace('-', ' ')

  return (
    <NavbarLayout>
      <Box pt={2.5}>
        <Card
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: '55px',
            p: {
              xs: '1.25rem 1.25rem 0.25rem',
              sm: '1rem 1.25rem',
              md: '0.5rem 1.25rem',
            },
          }}
          elevation={1}
        >
          <div>
            <H5>Tìm kiếm theo “ {searchBy} ”</H5>
            <Paragraph color="grey.600">
              {products.pagination.totals} được tìm thấy
            </Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap" my="0.5rem">
            <FlexBox alignItems="center" flex="1 1 0">
              <Paragraph color="grey.600" mr={2} whiteSpace="pre">
                Sắp xếp:
              </Paragraph>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Short by"
                select
                defaultValue={sortOptions[0].value}
                onChange={(e) => setSort(e.target.value)}
                fullWidth
                sx={{
                  flex: '1 1 0',
                  mr: '1.75rem',
                  minWidth: '150px',
                }}
              >
                {sortOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>
              <IconButton onClick={toggleView('grid')}>
                <Apps
                  color={view === 'grid' ? 'primary' : 'inherit'}
                  fontSize="small"
                />
              </IconButton>

              {!!isTablet && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCard handleFilterData={handleFilterData} />
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          <Grid
            item
            lg={3}
            xs={12}
            sx={{
              '@media only screen and (max-width: 1024px)': {
                display: 'none',
              },
            }}
          >
            <ProductFilterCard handleFilterData={handleFilterData} />
          </Grid>

          <Grid item lg={9} xs={12}>
            <ProductCard1List
              params={params}
              handleChange={handleChange}
              products={products}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Box>
    </NavbarLayout>
  )
}

const sortOptions = [
  { label: 'Giá từ thấp đến cao', value: 'lowToHigh' },
  { label: 'Giá từ cao đến thấp', value: 'highToLow' },
]
