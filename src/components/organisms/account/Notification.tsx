import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import React from 'react'

type Props = {}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
export default function Notification({}: Props) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Chờ lấy hàng" {...a11yProps(1)} />
          <Tab label="Đã giao" {...a11yProps(2)} />
          <Tab label="Đã hủy" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Tất cả
      </TabPanel>
      <TabPanel value={value} index={1}>
        Chờ lấy hàng
      </TabPanel>
      <TabPanel value={value} index={2}>
        Đã giao
      </TabPanel>
      <TabPanel value={value} index={3}>
        Đã hủy
      </TabPanel>
    </Box>
  )
}
