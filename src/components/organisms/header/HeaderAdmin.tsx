import * as React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link,
} from '@material-ui/core'
import clsx from 'clsx'

export interface IHeaderAdminProps {}

export function HeaderAdmin(props: IHeaderAdminProps) {
  return <AppBar position="fixed"></AppBar>
}
