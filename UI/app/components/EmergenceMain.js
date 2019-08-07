// @flow
import React, { Component } from 'react';
import MenuBar from './MenuBar2';

import styles from './Home.css';
import { Menu } from '@material-ui/core';

export default class EmergenceMain extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      holder: "test"
    };
  }

  render() {
    return (
        <div className={styles.pagecontainer}>
            <MenuBar/>
            <div className={styles.pagecontent}>
                <h1>Logged In!</h1>
            </div>
        </div>
    );
  }
}
