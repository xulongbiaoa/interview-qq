import React from 'react';
import { Layout } from 'antd';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg"></img>
    </Layout.Header>
  );
};

export default Header;
