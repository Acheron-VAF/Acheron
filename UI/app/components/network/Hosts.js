// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

import MUIDataTable from "mui-datatables";

import styles from '../Home.css';

export default class ControlPanel extends Component<Props> {

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
    let rows = this.props.hostdata.map((vuln, index) => {
      return [vuln.name, vuln.rating];
    });

    return (
      <div className={styles.tabpage}>
        <MUIDataTable
          title={"Hosts"}
          data={rows}
          columns={columns}
          options={options}
          fullWidth
        />
      </div>
    );
  }
}
