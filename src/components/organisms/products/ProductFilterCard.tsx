import FlexBox from '@Atoms/ui/FlexBox'
import { H5, H6, Span } from '@Atoms/utils/Typography'
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'

type Props = {
  handleFilterData: Function
}

const useStyles = makeStyles({
  input: {
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
})
const ProductFilterCard = ({ handleFilterData }: Props) => {
  const classes = useStyles()

  const [priceFrom, setPriceFrom] = useState<any>()
  const [priceTo, setPriceTo] = useState<any>()
  const [screenSize, setScreenSize] = React.useState({
    size133: false,
    size136: false,
    size14: false,
    size16: false,
  })

  const handleChangeScreenSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScreenSize({
      ...screenSize,
      [event.target.name]: event.target.checked,
    })
  }

  const [ram, setRam] = React.useState({
    ram8GB: false,
    ram16GB: false,
    ram32GB: false,
  })

  const handleChangeRam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRam({
      ...ram,
      [event.target.name]: event.target.checked,
    })
  }

  const [cpu, setCpu] = React.useState({
    M1: false,
    M2: false,
    Corei3: false,
    Corei5: false,
    Corei7: false,
    AMDRyzen5: false,
    AMDRyzen7: false,
    AMDRyzen3: false,
  })

  const handleChangeCpu = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpu({
      ...cpu,
      [event.target.name]: event.target.checked,
    })
  }

  const handleFilter = (v: any) => {
    handleFilterData(v)
  }

  useEffect(() => {
    const entriesScreen = Object.entries(screenSize)
    const screen = entriesScreen
      .filter((v) => v[1] === true)
      .map((v) => {
        if (v[1]) {
          let str
          if (v[0].length > 6) {
            str = v[0].slice(4, 6) + '.' + v[0].slice(6)
            return str
          } else {
            str = v[0].slice(4, 6)
            return str
          }
        }
      })

    const entriesRam = Object.entries(ram)
    const ramMap = entriesRam
      .filter((v) => v[1] === true)
      .map((v) => {
        if (v[1]) {
          return v[0].slice(3)
        } else {
          return
        }
      })

    const entriesCpu = Object.entries(cpu)
    const cpuMap = entriesCpu
      .filter((v) => v[1] === true)
      .map((v) => {
        if (v[1]) {
          let str
          if (v[0].length == 2) {
            str = v[0]
            return str
          } else if (v[0].length == 6) {
            str = v[0].slice(0, 4) + ' ' + v[0].slice(4)
            return str
          } else {
            str = v[0].slice(0, 3) + ' ' + v[0].slice(3, 8) + ' ' + v[0].slice(8)
            return str
          }
        }
      })

    const data = {
      screen: screen,
      cpu: cpuMap,
      ram: ramMap,
      priceFrom: priceFrom,
      priceTo: priceTo,
    }

    handleFilter(data)
  }, [screenSize, cpu, ram, priceFrom, priceTo])
  return (
    <Card sx={{ p: '18px 27px', overflow: 'auto' }} elevation={1}>
      <H6 mb={2}>Khoảng giá</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField
          placeholder="Từ"
          type="number"
          size="small"
          fullWidth
          onChange={(e) => setPriceFrom(parseInt(e.target.value))}
          className={classes.input}
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder="đến"
          type="number"
          size="small"
          fullWidth
          onChange={(e) => setPriceTo(parseInt(e.target.value))}
          className={classes.input}
        />
      </FlexBox>

      <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Screen Size</H6>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={screenSize.size133}
              onChange={handleChangeScreenSize}
              name="size133"
            />
          }
          label={<Span color="inherit">13.3"</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={screenSize.size136}
              onChange={handleChangeScreenSize}
              name="size136"
            />
          }
          label={<Span color="inherit">13.6"</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={screenSize.size14}
              onChange={handleChangeScreenSize}
              name="size14"
            />
          }
          label={<Span color="inherit">14"</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={screenSize.size16}
              onChange={handleChangeScreenSize}
              name="size16"
            />
          }
          label={<Span color="inherit">16"</Span>}
          sx={{ display: 'flex' }}
        />
      </FormGroup>

      <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>RAM</H6>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={ram.ram8GB}
              onChange={handleChangeRam}
              name="ram8GB"
            />
          }
          label={<Span color="inherit">8GB</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={ram.ram16GB}
              onChange={handleChangeRam}
              name="ram16GB"
            />
          }
          label={<Span color="inherit">16GB</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={ram.ram32GB}
              onChange={handleChangeRam}
              name="ram32GB"
            />
          }
          label={<Span color="inherit">32GB</Span>}
          sx={{ display: 'flex' }}
        />
      </FormGroup>

      <Divider sx={{ my: '1.5rem' }} />

      <H6 mb={2}>Series CPU</H6>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={cpu.M1} onChange={handleChangeCpu} name="M1" />
          }
          label={<Span color="inherit">M1</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox checked={cpu.M2} onChange={handleChangeCpu} name="M2" />
          }
          label={<Span color="inherit">M2</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cpu.Corei3}
              onChange={handleChangeCpu}
              name="Corei3"
            />
          }
          label={<Span color="inherit">Core I3</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cpu.Corei5}
              onChange={handleChangeCpu}
              name="Corei5"
            />
          }
          label={<Span color="inherit">Core I5</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cpu.Corei7}
              onChange={handleChangeCpu}
              name="Corei7"
            />
          }
          label={<Span color="inherit">Core I7</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cpu.AMDRyzen3}
              onChange={handleChangeCpu}
              name="AMDRyzen3"
            />
          }
          label={<Span color="inherit">Ryzen 3</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cpu.AMDRyzen5}
              onChange={handleChangeCpu}
              name="AMDRyzen5"
            />
          }
          label={<Span color="inherit">Ryzen 5</Span>}
          sx={{ display: 'flex' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cpu.AMDRyzen7}
              onChange={handleChangeCpu}
              name="AMDRyzen7"
            />
          }
          label={<Span color="inherit">Ryzen 7</Span>}
          sx={{ display: 'flex' }}
        />
      </FormGroup>
    </Card>
  )
}

export default ProductFilterCard
