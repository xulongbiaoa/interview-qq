import React from 'react';
import Header from './header';
import Footer from './footer';
import { Layout } from 'antd'
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Layout  >
    <Header />
    <Layout.Content>Content</Layout.Content>
    {children}
    <Footer />
  </Layout>
}
export default LayoutWrapper;