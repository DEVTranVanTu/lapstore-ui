import LapstoreCard from '@Atoms/ui/LapstoreCard'
import Carousel from '@Molecules/carousel/Carousel'
import Category from '@Atoms/icons/Category'
import useWindowSize from '@Atoms/hooks/useWindowSize'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CategorySectionCreator from '@Molecules/categorysection/CategorySectionCreator'
import TopSelling from '@Organisms/productcart/TopSelling'
import dealAndOffers from '@data/dealAndOffers'

const DealAndOffers = () => {
  const [visibleSlides, setVisibleSlides] = useState(4)
  const width = useWindowSize()

  useEffect(() => {
    if (width < 650) setVisibleSlides(1)
    else if (width < 950) setVisibleSlides(2)
    else setVisibleSlides(4)
  }, [width])

  return (
    <CategorySectionCreator
      icon={<Category color="secondary" />}
      title="Top sản phẩm bán chạy"
      seeMoreLink="#"
    >
      <Carousel
        totalSlides={dealAndOffers.length}
        visibleSlides={visibleSlides}
        autoPlay={true}
      >
        {dealAndOffers.map((item, ind) => (
          <Link href={item.categoryUrl} key={ind}>
            <a>
              <LapstoreCard elevation={0}>
                <TopSelling
                  title={item.title}
                  imgUrl={item.imgUrl}
                  price={item.price}
                  rating={item.rating}
                  sould={item.sould}
                />
              </LapstoreCard>
            </a>
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  )
}

export default DealAndOffers
