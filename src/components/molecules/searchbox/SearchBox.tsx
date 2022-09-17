import { Box, Button, TextField } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { debounce } from '@material-ui/core/utils'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const StyledBox = styled(Box)(({ theme }) => ({
  '.searchIcon': {
    color: theme.palette.grey[600],
    marginRight: 6,
  },
  '.buttonsearch': {
    background: '#1266f1',
    width: '100px',
    borderRadius: '0 4px 4px 0',
    height: '38px',
    color: '#ffffff',
    '&:hover': {
      background: '#1266f1',
    },
  },
}))

const SearchBox = () => {
  const [resultList, setResultList] = useState<string[]>([])
  const parentRef = useRef()

  const search = debounce((e) => {
    const value = e.target?.value

    if (!value) setResultList([])
    else setResultList(dummySearchResult)
  }, 200)

  const hanldeSearch = useCallback((event) => {
    event.persist()
    search(event)
  }, [])

  const handleDocumentClick = () => {
    setResultList([])
  }

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick)
    return () => {
      window.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const buttonSearch = (
    <Button className="buttonsearch" startIcon={<SearchOutlined />}></Button>
  )

  return (
    <StyledBox
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <TextField
        variant="outlined"
        placeholder="Nhập từ khóa cần tìm ..."
        fullWidth
        onChange={hanldeSearch}
        InputProps={{
          sx: {
            paddingRight: 0,
            color: 'grey.700',
            overflow: 'hidden',
          },
          endAdornment: buttonSearch,
        }}
      />
    </StyledBox>
  )
}

const dummySearchResult = [
  'Macbook Air 13',
  'Asus K555LA',
  'Acer Aspire X453',
  'iPad Mini 3',
]

export default SearchBox
