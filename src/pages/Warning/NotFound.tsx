import React, { Component } from 'react';

import styles from './index.module.scss';


export default class NotFound extends Component {
  render() {
    return (
      <div className={`${styles.notFound} warning-page text-center`}>

        <p>
          <span className={styles.title}>404</span>
        </p>
      </div>
    );
  }
}
