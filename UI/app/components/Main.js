// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

import Terminal from 'terminal-in-react';
import SessionTracker from '../utils/SessionTracker';

import MenuBar from './MenuBar';
import WindowControls from './WindowControls';

//Pages
import SessionTable from './SessionTable';
import Vulnerabilities from './Vulnerabilities';
import Network from './Network';

import EmergenceSetup from './EmergenceSetup';
import EmergenceCheck from './EmergenceCheck';

const remote = require('electron').remote;

import { getSettings } from '../renderers/settings-control';

type Props = {
  addSession: () => void,
  sessions: []
};

export default class PrismaticInterpreter extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
       hideCompleted: false,
       sessionTable: false,
       showVulnerabilities: false,
       showNetwork: true,
       settings: getSettings(),
       session: '',
       tabs: []
    };
    this.toggleTableView = this.toggleTableView.bind(this)
    this.showVulnerabilities = this.showVulnerabilities.bind(this)
    this.showNetwork = this.showNetwork.bind(this)
  }

  toggleTableView() {
    this.hideAll()
    if (this.state.sessionTable == true) {
      this.setState({ sessionTable: false });
    } else {
      this.setState({ sessionTable: true });
    }
  }
  showVulnerabilities() {
    this.hideAll();
    this.setState({ showVulnerabilities: true });
  }
  showNetwork() {
    this.hideAll();
    this.setState({ showNetwork: true });
  }
  hideAll() {
    this.setState(
      {
        sessionTable: false,
        showVulnerabilities: false,
      }
      );
  }

  // this.state.settings.emergenceServer

  render() {
    const {
      sessions,
      addSession
    } = this.props;

    return (
      <div className={styles.basecontainer}>
        <WindowControls />
        { typeof this.state.settings.emergence.server === 'undefined' ? <EmergenceSetup/> : <EmergenceCheck settings={this.state.settings}/> }
      </div>
    );
  }
}
