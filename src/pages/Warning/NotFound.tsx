import React from 'react';

import styles from './index.module.scss';


const NotFound: React.FC = () => {

  return (
    <div className={`${styles.notFound} warning-page text-center`}>

      <p>
        <span className={styles.title}>404</span>
      </p>
    </div>
  );

}
export default NotFound
