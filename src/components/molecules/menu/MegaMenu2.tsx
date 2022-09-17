import LapstoreCard from '@Atoms/ui/LapstoreCard'
import React from 'react'
import CategoryMenuItem from '@Molecules/category/CategoryMenuItem'
import StyledMegaMenu from './StyledMegaMenu'
import { subCategory } from '@Models/subCategory'
import { linkToName } from 'utils'

export interface MegaMenu2Props {
  data: subCategory[]
}

const MegaMenu2: React.FC<MegaMenu2Props> = ({ data }) => {
  const subCategories = data

  return (
    <StyledMegaMenu>
      <LapstoreCard elevation={2} sx={{ ml: '1rem', py: '0.5rem' }}>
        {subCategories?.map((item) => (
          <CategoryMenuItem
            title={item.subCategoryName}
            href={`/product/search/${linkToName(item.subCategoryName)}-cat.${
              item._id
            }`}
            caret={false}
            id={item._id}
            key={item._id}
          ></CategoryMenuItem>
        ))}
      </LapstoreCard>
    </StyledMegaMenu>
  )
}

export default MegaMenu2
