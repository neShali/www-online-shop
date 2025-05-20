import { Outlet } from 'react-router';
import Footer from './Footer';
import { Header } from './header';
import ProductsButton from '../buttons/products_buttons';
import CartButton from '../buttons/card_buttons';
import ArrowButton from '../buttons/arrow_buttons';
import PlusButton from '../buttons/plus_buttons';

export default function Layout() {
  return (
    <>
      <Header />
      <ProductsButton />
      <ProductsButton size="small" />
      <CartButton />
      <CartButton size="small" />
      <ArrowButton direction="left" />
      <ArrowButton direction="right" />
      <PlusButton />

      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
