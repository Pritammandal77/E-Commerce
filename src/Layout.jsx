import React from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function Layout() {
  return (
    <>
      {/* The ScrollToTop component is used to go to the top of any page. Without this component, we are going to the position where we left off on the previous page instead of starting from the top when navigating to a new route. */}
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
