// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './Home.css';

import NewVulnerability from './menus/NewVulnerability';
import ControlPanel from './network/ControlPanel';
import Hosts from './network/Hosts';

export default class Network extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      showNewVulnerability: false,
      showControlPanel: true,
      showHostView: false,
    };
    this.doUpdate = this.doUpdate.bind(this)
    this.showHostView = this.showHostView.bind(this)
    this.showControlPanel = this.showControlPanel.bind(this)
  }
  doUpdate() {
    console.log("test")
  }
  showHostView() {
    this.hideAll();
    this.setState({ showHostView: true });
  }
  showControlPanel() {
    this.hideAll();
    this.setState({ showControlPanel: true });
  }
  hideAll() {
    this.setState(
      {
        showHostView: false,
        showControlPanel: false,
      }
    );
  }

  render() {

    return (
      <div className={styles.pagecontainer}>
        <div className={styles.pageheaderbg}>
          <div className={styles.tabs}>
            <Grid container spacing={24}>
              <Grid onClick={this.showControlPanel} item xs={6}>
                <Typography>Control Panel</Typography>
              </Grid>
              <Grid onClick={this.showHostView} item xs={6}>
                <Typography>Hosts</Typography>
              </Grid>
            </Grid>
          </div>


          {this.state.showControlPanel ? <ControlPanel /> : null }
          {this.state.showHostView ? <Hosts hostdata={this.props.hostdata} /> : null }

        </div>
      </div>
    );
  }
}
