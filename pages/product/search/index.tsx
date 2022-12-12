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
  inventorySearchActions,
  selectInventoryListSearch,
  selectInventorySearchLoading,
} from '../../../store/slices/inventorySlice'

export default function ProductSearchInputResult() {
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
  const keyword = router.query.keyword
  const [sort, setSort] = useState('lowToHigh')
  const [filters, setFilters] = useState({})

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

  const handleFilterData = (value: any) => {
    setFilters(value)
  }

  const products = useAppSelector(selectInventoryListSearch)
  const loading = useAppSelector(selectInventorySearchLoading)

  useEffect(() => {
    setParams({
      ...params,
      sort: sort,
      filters: filters,
    })
  }, [filters, sort])

  useEffect(() => {
    const timer = setTimeout(() => {
      keyword &&
        dispatch(
          inventorySearchActions.fetchSearchInventoryList({
            keyword: keyword.toString(),
            params,
          })
        )
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [keyword, dispatch, params])

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
            <H5>Tìm kiếm theo “ {keyword}”</H5>
            <Paragraph color="grey.600">
              {products.data.length} được tìm thấy
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
