// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

import MUIDataTable from "mui-datatables";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import styles from './Home.css';

import NewVulnerability from './menus/NewVulnerability';

export default class Vulnerabilities extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      showNewVulnerability: false,
    };
    this.doUpdate = this.doUpdate.bind(this)
    this.toggleNewVulnerability = this.toggleNewVulnerability.bind(this)
  }
  doUpdate() {
    console.log("test")
  }
  toggleNewVulnerability() {
    if (this.state.showNewVulnerability == true) {
      this.setState({ showNewVulnerability: false });
    } else {
      this.setState({ showNewVulnerability: true });
    }
  }

  render() {
    const options = {
      filterType: 'dropdown',
      viewColumns: false,
      selectableRows: false
    };
    const columns = [
     {
      name: "os",
      label: "OS",
      options: {
       customBodyRender: (value) => {
          return (
            <FontAwesomeIcon className={styles.osfont} icon={faWindows} />
          );
       },
       filter: true,
       sort: true,
      }
     },
     {
      name: "internal",
      label: "Internal",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "external",
      label: "External",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "user",
      label: "User",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "system",
      label: "System",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "note",
      label: "Notes",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "last",
      label: "Last",
      options: {
       filter: true,
       sort: false,
      }
     },
    ];
    let rows = this.props.vulndata.map((vuln, index) => {
      return [vuln.name, vuln.rating];
    });

    return (
      <div className={styles.pagecontainer}>
        <div className={styles.pageheaderbg}>
        <div className={styles.pageheader}>
          <Typography>Control Panel</Typography>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Paper>

              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>

              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>

              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color= "primary" component="span" onClick={this.toggleNewVulnerability.bind(this)}>
                Add Vulnerability
              </Button>
            </Grid>
          </Grid>
        </div>
        </div>

        <MUIDataTable
          title={"Vulnerabilities"}
          data={rows}
          columns={columns}
          options={options}
          fullWidth
        />
        {this.state.showNewVulnerability ? <NewVulnerability
           toggleNewVulnerability={this.toggleNewVulnerability} /> : null }
      </div>
    );
  }
}
