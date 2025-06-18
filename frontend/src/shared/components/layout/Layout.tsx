import { Outlet } from 'react-router';
import { Footer } from './footer';
import { Header } from './header';
export function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
