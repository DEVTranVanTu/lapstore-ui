import ArrowRight from '@material-ui/icons/ArrowRight'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import FlexBox from '@Atoms/ui/FlexBox'
import { H2 } from '@Atoms/utils/Typography'

export interface CategorySectionHeaderProps {
  title?: string
  seeMoreLink?: string
  icon?: ReactNode
}

const CategorySectionHeader: React.FC<CategorySectionHeaderProps> = ({
  title,
  seeMoreLink,
}) => {
  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb={5}>
      <FlexBox alignItems="center">
        <H2 fontWeight="bold" lineHeight="1">
          {title}
        </H2>
      </FlexBox>

      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <a>
            <FlexBox alignItems="center" ml={1} color="grey.600">
              Xem tất cả
              <ArrowRight fontSize="small" color="inherit" />
            </FlexBox>
          </a>
        </Link>
      )}
    </FlexBox>
  )
}

export default CategorySectionHeader
