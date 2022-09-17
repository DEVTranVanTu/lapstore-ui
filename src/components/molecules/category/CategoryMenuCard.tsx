import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MuiThemeProps } from '@Atoms/themes/theme'
import React, { useEffect } from 'react'
import CategoryMenuItem from './CategoryMenuItem'
import MegaMenu2 from '@Molecules/menu/MegaMenu2'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  categoryNavActions,
  selectCategoryNavList,
  selectCategoryNavLoading,
} from '../../../../store/slices/categoryNavSlice'
import { linkToName } from 'utils'
export interface CategoryMenuCardProps {
  open?: boolean
  position?: 'absolute' | 'relative'
}

const useStyles = makeStyles(({ palette, shadows }: MuiThemeProps) => ({
  root: (props: CategoryMenuCardProps) => ({
    position: props.position || 'unset',
    padding: '0.5rem 0px',
    left: 0,
    right: 'auto',
    top: props.position === 'absolute' ? 'calc(100% + 0.7rem)' : '0.5rem',
    borderRadius: 4,
    transform: props.open ? 'scaleY(1)' : 'scaleY(0)',
    transformOrigin: 'top',
    backgroundColor: palette.background.paper,
    boxShadow: shadows[2],
    transition: 'all 250ms ease-in-out',
    zIndex: 98,
  }),
}))

const CategoryMenuCard: React.FC<CategoryMenuCardProps> = (props) => {
  const classes = useStyles(props)
  const dispatch = useAppDispatch()

  const categoryList = useAppSelector(selectCategoryNavList)
  const loading = useAppSelector(selectCategoryNavLoading)

  useEffect(() => {
    dispatch(categoryNavActions.fetchCategoryNavList())
  }, [dispatch])

  return (
    <Box className={classes.root}>
      {loading ? (
        ''
      ) : (
        <>
          {categoryList.map((item) => {
            return (
              <CategoryMenuItem
                title={item.categoryName}
                href={`/product/search/${linkToName(item.categoryName)}-cat.${
                  item._id
                }`}
                caret={!!item.subCategory.length}
                id={item._id}
                key={item._id}
              >
                <MegaMenu2 data={item.subCategory} />
              </CategoryMenuItem>
            )
          })}
        </>
      )}
    </Box>
  )
}

CategoryMenuCard.defaultProps = {
  position: 'absolute',
}

export default CategoryMenuCard
