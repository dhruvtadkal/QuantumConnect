// components/App.js
import React from 'react';
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';

function App({ children }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        {children}
      </Layout>
    </>
  );
}

export default App;
