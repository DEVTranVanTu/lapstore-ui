import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import React from 'react'
import OrderList from './components/OrderList'

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
export default function Order({}: Props) {
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
          <Tab label="Đang giao hàng" {...a11yProps(2)} />
          <Tab label="Đã giao" {...a11yProps(3)} />
          <Tab label="Đã hủy" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderList filter="" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderList filter="0" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderList filter="1" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OrderList filter="2" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OrderList filter="3" />
      </TabPanel>
    </Box>
  )
}
