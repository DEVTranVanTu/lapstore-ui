import Promotions from '@Templates/promotions/Promotions'
import HomeLayout from '@Layouts/HomeLayout'
import DealAndOffer from '@Templates/dealandoffer/DealAndOffers'
import Recommended from '@Templates/recommended/Recommended'
import LaptopMacbook from '@Organisms/laptopmacbook/LaptopMacbook'

const Home = () => {
  return (
    <HomeLayout>
      <Promotions />
      <DealAndOffer />
      <LaptopMacbook />
      {/* <ProductsElectronics /> */}
      <Recommended />
    </HomeLayout>
  )
}

export default Home
