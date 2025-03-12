import React from 'react';
import Header from './Header';
import Hero from './Hero';
import FeaturedTheses from './FeaturedTheses';
import Footer from './Footer';
import LatestUpdates from './LatestUpdates';
import InfiniteCarousel from './InfiniteCarousel';
function Home() {
  return (
    <div data-theme="dark">
      {/* <Header /> */}
      <Hero />
      <InfiniteCarousel/>
      <LatestUpdates/>
      <FeaturedTheses />
      <Footer />
      
    </div>
  );
}

export default Home;
