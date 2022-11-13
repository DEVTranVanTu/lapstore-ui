import LapstoreCard from '@Atoms/ui/LapstoreCard'
import Carousel from '@Molecules/carousel/Carousel'
import Category from '@Atoms/icons/Category'
import useWindowSize from '@Atoms/hooks/useWindowSize'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CategorySectionCreator from '@Molecules/categorysection/CategorySectionCreator'
import TopSelling from '@Organisms/productcart/TopSelling'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  selectTopProductList,
  topProductActions,
} from '../../../../store/slices/productSlice'
import { linkToName } from 'utils'

const DealAndOffers = () => {
  const [visibleSlides, setVisibleSlides] = useState(4)
  const width = useWindowSize()

  const dispatch = useAppDispatch()

  const topProducts = useAppSelector(selectTopProductList)

  console.log('topProducts', topProducts)

  useEffect(() => {
    if (width < 650) setVisibleSlides(1)
    else if (width < 950) setVisibleSlides(2)
    else setVisibleSlides(4)
  }, [width])

  useEffect(() => {
    dispatch(topProductActions.fetchTopProductList())
  }, [dispatch])

  return (
    <CategorySectionCreator
      icon={<Category color="secondary" />}
      title="Top sản phẩm bán chạy"
      seeMoreLink="#"
    >
      <Carousel
        totalSlides={topProducts.length}
        visibleSlides={visibleSlides}
        autoPlay={true}
      >
        {topProducts?.map((item, ind) => (
          <Link
            href={`/product/${linkToName(item.productDetail.productName)}-sku.${
              item.productDetail._id
            }`}
            key={ind}
          >
            <a>
              <LapstoreCard elevation={0}>
                <TopSelling product={item} />
              </LapstoreCard>
            </a>
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  )
}

export default DealAndOffers
