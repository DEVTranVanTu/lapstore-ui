import FlexBox from '@Atoms/ui/FlexBox'
import LapstoreAvatar from '@Atoms/ui/LapstoreAvatar'
import { H3, Span } from '@Atoms/utils/Typography'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { userInfor } from '@Models/user'
import React, { ChangeEvent, FC, useState } from 'react'
import { getDays, getMonths, getYears } from 'utils'
import uploadApi from '../../../../api/uploadApi'

export interface Profile {
  profile: userInfor
  updateProfile: Function
}

interface StateDate {
  day: string
  month: string
  year: string
}

interface StateProfile {
  address: string
  dateOfBirth: string
  photo: string
  sex: string
  district: string
  phoneNumber: string
  province: string
  wards: string
}
const useStyles = makeStyles(() => ({
  userInfor: {
    paddingRight: '50px',
  },
  userAvarta: {
    borderLeft: '1px solid #F3F5F9',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
  imageUpload: {
    position: 'relative',
  },
  btnSubmit: {
    padding: '10px 40px',
    background: '#1266f1',
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
      padding: '10px 40px',
      background: '#1266f1',
    },
  },
  choseFile: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
}))

const Profile: FC<Profile> = ({ profile, updateProfile }) => {
  const fileSelected = async (e: ChangeEvent) => {
    const newFile = (e.target as HTMLInputElement).files || []
    let file: File | undefined = newFile[0]
    if (file) {
      const result = await uploadApi.postImage({ image: file })
      setImages(result.data.imagePath)
      file = undefined
    }
  }

  const classes = useStyles()

  const days = getDays()
  const months = getMonths()
  const years = getYears()

  const [userProfile, setUserProfile] = React.useState<StateProfile>(
    profile.user.profile
  )
  const [images, setImages] = useState(userProfile?.photo)

  const handleChangeProfile =
    (prop: keyof StateProfile) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserProfile({ ...userProfile, [prop]: event.target.value })
    }

  const dateOfBirth = userProfile?.dateOfBirth?.toString()

  const DateArr = dateOfBirth ? dateOfBirth.split('-') : []

  const [date, setDate] = React.useState<StateDate>({
    day: DateArr[2]?.slice(0, 2),
    month: DateArr[1],
    year: DateArr[0],
  })

  const handleChangeDate =
    (prop: keyof StateDate) => (event: { target: { value: string } }) => {
      setDate({ ...date, [prop]: event.target.value })
    }

  const handleUpdateProfile = () => {
    const id = profile.user._id
    const data = {
      phoneNumber: userProfile.phoneNumber,
      photo: images,
      dateOfBirth: date.year + '-' + date.month + '-' + date.day,
      sex: userProfile.sex,
      province: userProfile.province,
      district: userProfile.district,
      wards: userProfile.wards,
      address: userProfile.address,
    }
    updateProfile(id, data)
  }
  return (
    <Box>
      <H3 p={1.25} pl={0} lineHeight={'40px'}>
        Thông tin cá nhân
      </H3>
      <Divider />
      <Box mt={5} display={'flex'}>
        <Box className={classes.userInfor} width={'65%'}>
          <Box display={'flex'} mb={3} alignItems="center">
            <Span width={'30%'}>Tên đăng nhập</Span>
            <Span>{profile.user.username}</Span>
          </Box>
          <Box display={'flex'} mb={3}>
            <Span width={'30%'}>Mật khẩu</Span>
            <Box>
              <Span>********</Span>
              <Span ml={2}>Thay đổi</Span>
            </Box>
          </Box>
          <Box display={'flex'} mb={3}>
            <Span width={'30%'}>Email</Span>
            <Span>{profile.user.email}</Span>
          </Box>
          <Box display={'flex'} mb={3} alignItems="center">
            <Span width={'30%'}>Số điện thoại</Span>
            <Box width={'70%'}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  id="outlined-adornment-name"
                  value={userProfile?.phoneNumber || ''}
                  onChange={handleChangeProfile('phoneNumber')}
                  size={'small'}
                  fullWidth
                  aria-describedby="outlined-name-helper-text"
                  type="phone"
                  startAdornment={
                    <InputAdornment position="start">+84</InputAdornment>
                  }
                  inputProps={{
                    'aria-label': 'phone',
                    pattern: '[0-9]{3} [0-9]{3} [0-9]{4}',
                    maxLength: '10',
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box display={'flex'} mb={3} alignItems="center">
            <Span width={'30%'}>Giới tính</Span>
            <FlexBox>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={userProfile?.sex ? userProfile.sex : 'other'}
                  onChange={handleChangeProfile('sex')}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </FlexBox>
          </Box>
          <Box display={'flex'} mb={3} alignItems="center">
            <Span width={'30%'}>Ngày sinh</Span>
            <FlexBox>
              <FormControl sx={{ m: 1, ml: 0 }} variant="standard" size="small">
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={date.day}
                  defaultValue={days[0]}
                  onChange={handleChangeDate('day')}
                  input={<OutlinedInput />}
                >
                  {days.map((day, index) => (
                    <MenuItem value={day} key={index}>
                      Ngày {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard" size="small">
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={date.month}
                  defaultValue={months[0]}
                  onChange={handleChangeDate('month')}
                  input={<OutlinedInput />}
                >
                  {months.map((mouth, index) => (
                    <MenuItem value={mouth} key={index}>
                      Tháng {mouth}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard" size="small">
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={date.year}
                  defaultValue={years[0]}
                  onChange={handleChangeDate('year')}
                  input={<OutlinedInput />}
                >
                  {years.map((year, index) => (
                    <MenuItem value={year} key={index}>
                      Năm {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FlexBox>
          </Box>
          <Box display={'flex'}>
            <Span width={'30%'}></Span>
            <Button
              variant="contained"
              className={classes.btnSubmit}
              onClick={handleUpdateProfile}
            >
              Lưu
            </Button>
          </Box>
        </Box>
        <Box width={'35%'}>
          <Box className={classes.userAvarta}>
            <Box display={'flex'} justifyContent={'center'}>
              <LapstoreAvatar src={images} width={'150px'} height={'150px'} />
            </Box>

            <Box display={'flex'} justifyContent={'center'} mt={3}>
              <Button variant="outlined" className={classes.imageUpload}>
                <input
                  type={'file'}
                  className={classes.choseFile}
                  accept="image/*"
                  onChange={(e) => fileSelected(e)}
                />
                <Span>Upload file</Span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default Profile
