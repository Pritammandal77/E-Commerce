import React from 'react';
import Header from './components/Header/Header';
import { Outlet, useNavigation } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Loader from './components/Loader/NormalLoader/Loader';

function Layout() {

  const navigation = useNavigation()

  return (
    <>
      {/* The ScrollToTop component is used to go to the top of any page. Without this component, we are going to the position where we left on the previous page instead of starting from the top when navigating to a new route. */}
      <ScrollToTop />
      <Header />
      {navigation.state === 'loading' ? <Loader /> : <Outlet />}
      <Footer />
    </>
  );
}

export default Layout;
