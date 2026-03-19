import React from 'react';
import PageLayout from './components/PageLayout';
import HomeView from './components/views/HomeView';
import Footer from './components/Footer';

function App() {
  return (
    <PageLayout>
      <HomeView />
      <Footer />
    </PageLayout>
  );
}

export default App;
