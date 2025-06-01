import { Outlet } from 'react-router';
import Footer from './Footer';
import { Header } from './header';
import ProductsButton from '../buttons/products_buttons';
import CartButton from '../buttons/card_buttons';
import ArrowButton from '../buttons/arrow_buttons';
import PlusButton from '../buttons/plus_buttons';
import CategoryTabs from '../tabs/category_tabs'
import SizeTabs from '../tabs/size_tabs';
import GenderTabs from '../tabs/gender_tabs';
import { ProductCard } from '../product__card/ProductCard';
// import CountrySelect from '../select/country_select';
export default function Layout() {
  return (
    <>
      <Header />
      <h2>КНОПКИ</h2><br />
      <ProductsButton />
      <ProductsButton size="small" />
      <CartButton />
      <CartButton size="small" />
      <ArrowButton direction="left" />
      <ArrowButton direction="right" />
      <PlusButton />
      <h2>ТАБЫ</h2><br />
      <CategoryTabs />
      <SizeTabs />
      <GenderTabs />
      <h2>КАРТОЧКА ТОВАРА</h2> <br />
      {/* <CountrySelect /> */}
      <ProductCard />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
