// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import styles from '../Home.css';

export default class ControlPanel extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
    };
    this.toggleNewVulnerability = this.toggleNewVulnerability.bind(this)
  }
  toggleNewVulnerability() {
    if (this.state.showNewVulnerability == true) {
      this.setState({ showNewVulnerability: false });
    } else {
      this.setState({ showNewVulnerability: true });
    }
  }


  render() {
    return (
      <div className={styles.tabpage}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Typography>APEXCHART Hosts 15</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>APEXCHART Sites 4</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={2}>
            <Button variant="contained" color= "primary" component="span" onClick={this.toggleNewVulnerability.bind(this)}>
              New Host
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color= "primary" component="span" onClick={this.toggleNewVulnerability.bind(this)}>
              New Site
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Paper>

            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper>

            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
