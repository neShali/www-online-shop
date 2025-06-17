import './index.css';
import { Route, Routes } from 'react-router';
import Layout from './shared/components/layout/Layout';
import HomePage from './pages/homePage';
import { ProductsPage } from './pages/productsPage';
import { ProductPage } from './pages/productPage';
import CartPage from './pages/cartPage';
import CheckoutPage from './pages/checkoutPage';
import { AuthPage } from './pages/authPage';
import ProfilePage from './pages/profilePage';
import './styles/fonts.css';
import { useScrollToTop } from './shared/hooks/useScrollToTop';

function App() {
  useScrollToTop();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="products">
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>

        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="profile" element={<ProfilePage />} />

        <Route path="*" element={<div>Страница не найдена</div>} />
      </Route>
    </Routes>
  );
}

export default App;
