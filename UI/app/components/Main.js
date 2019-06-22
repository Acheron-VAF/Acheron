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
       agentid: '',
       task: '',
       cmdRet: '',
       oldCmdRet: '',
       prompt: 'PRISM> ',
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

  //Emergence Controls
  emCreateTask(task) {
    //Shell tasks and CMD passthrough
    var cmd = task._.join(" ");

    //Get Session ID from localStorage
    var sid = localStorage.getItem("currentSession")

    //Match SID to AID
    var agentid = ''
    let data = this.props.sessions
    var sessionDetails = Object.keys(data).map(function(key) {
        if (data[key].id == sid) {
          agentid = data[key].aid
          //console.log(data[key].aid)
        }
    });
    //If no id user not interacting with session

    fetch('http://' + this.state.settings.emergenceServer + ':29001/api/task', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentid: agentid.toString(),
        datetime: "now",
        cmd: cmd
      })
    })
  }

  emTaskResponse() {
    try {
      if (this.state.oldCmdRet._id != this.state.cmdRet._id) {
        console.log(atob(this.state.cmdRet.retval));
        this.setState({
          oldCmdRet: this.state.cmdRet
        });
      }
    } catch(e) {
      let tmptmp = 0;
    }
  }

  handleChange() {
    console.log("here")
  }





  render() {
    const {
      sessions,
      addSession
    } = this.props;

    const vulndata = [
      {
        name: "MS17-010 ETERNALBLUE",
        rating: "High",
      },
      {
        name: "MS17-010 ETERNALBLUE",
        rating: "High",
      },
      {
        name: "MS17-010 ETERNALBLUE",
        rating: "High",
      },
    ]

    const hostdata = [
      {
        name: "DC1",
        ip: "10.0.10.6",
      },
      {
        name: "DC2",
        ip: "10.0.10.5",
      },
      {
        name: "SharePoint",
        ip: "10.0.30.10",
      },
    ]


    return (
      <div className={styles.basecontainer}>
        <WindowControls />
        <MenuBar toggleTableView={this.toggleTableView} showVulnerabilities={this.showVulnerabilities} showNetwork={this.showNetwork}/>

        { this.state.sessionTable ? <SessionTable sessions={this.props.sessions} /> : null }
        { this.state.showVulnerabilities ? <Vulnerabilities vulndata={vulndata}/> : null }
        { this.state.showNetwork ? <Network hostdata={hostdata}/> : null }

        <div className={styles.container} data-tid="container">

        </div>
      </div>
    );
  }
}
