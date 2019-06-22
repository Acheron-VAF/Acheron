// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as CounterActions from '../actions/counter';
import * as SessionActions from '../actions/sessionTracker';
import Main from '../components/Main';

function mapStateToProps(state) {
  return {
    sessions: state.sessions,
    counter: state.counter
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(SessionActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
