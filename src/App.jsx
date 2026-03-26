import React, { useState } from 'react';
import PageLayout from './components/PageLayout';
import HomeView from './components/views/HomeView';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onFinish={() => setLoaded(true)} />}
      <PageLayout>
        <HomeView />
        <Footer />
      </PageLayout>
    </>
  );
}

export default App;
