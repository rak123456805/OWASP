import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AIchatbot from '../features/landing/components/AIchatbot';

const MainLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <AIchatbot />
    </div>
  );
};

export default MainLayout;
