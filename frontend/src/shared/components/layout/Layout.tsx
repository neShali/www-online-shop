import { Outlet } from 'react-router';
import Footer from './Footer';
import { Header } from './header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
