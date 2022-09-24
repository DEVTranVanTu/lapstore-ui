import { H3 } from '@Atoms/utils/Typography'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { getUserInfo } from 'utils'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  getUserProfile,
  getUserProfileLoading,
  userProfileActions,
} from '../../../../store/slices/userSlice'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

interface State {
  amount: string
  password: string
  weight: string
  weightRange: string
  showPassword: boolean
}

export default function Profile() {
  const dispatch = useAppDispatch()

  const userProfile = useAppSelector(getUserProfile)
  const loading = useAppSelector(getUserProfileLoading)

  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    const user = getUserInfo()
    const id = user._id
    dispatch(userProfileActions.getUserProfile(id))
  }, [dispatch])
  return (
    <Box>
      {loading ? (
        ''
      ) : (
        <Box>
          <H3>My profile</H3>
          <Box>
            <FormControl variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={values.weight}
                onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <FormControl variant="outlined">
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Box>
      )}
    </Box>
  )
}
