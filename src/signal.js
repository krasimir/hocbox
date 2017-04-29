import React from 'react';

var SignalStorage = {};
var SignalComponentID = 0;
var SignalLog = [];

function getNewId() {
  return ++SignalComponentID;
}

export function getLog() {
  return SignalLog;
}

export function clearLog() {
  SignalLog = [];
}

export function dispatch(key, data, source) {
  SignalLog.push({
    key: key,
    data: data,
    source: source
  });
  if (SignalStorage[key]) {
    Object.keys(SignalStorage[key]).forEach(id => {
      SignalStorage[key][id](data);
    });
  }
}
export function subscribe(key, signalID, callback) {
  if (!SignalStorage[key]) SignalStorage[key] = {};
  if (typeof signalID === 'function') {
    callback = signalID;
    signalID = getNewId();
  }
  if (!SignalStorage[key][signalID]) {
    SignalStorage[key][signalID] = callback;
  }
}
export function unsubscribe(key, signalID) {
  if (key === null) {
    Object.keys(SignalStorage).forEach(key => {
      if (SignalStorage[key][signalID]) delete SignalStorage[key][signalID];
    });
  } else {
    if (SignalStorage[key][signalID]) delete SignalStorage[key][signalID];
  }
}

export function signal(Component) {
  return class SignalComponent extends React.Component {
    constructor(props) {
      super(props);
      this._signalID = (Component.name || '') + '_' + getNewId();
      this._dispatch = (key, data) => {
        dispatch(key, data, this._signalID);
      }
      this._subscribe = (...keys) => {
        keys.forEach(key => {
          subscribe(key, this._signalID, data => this.setState({ [key]: data }));
        });
      }
      this._unsubscribe = (...keys) => {
        if (keys.length === 0) {
          unsubscribe(null, this._signalID);
          return;
        }
        keys.forEach(key => {
          unsubscribe(key, this._signalID);
        });
      }

      Object.keys(props).forEach(prop => {
        if (props[prop] === true) this._subscribe(prop);
      })
    }
    render() {
      return <Component
        { ...this.props }
        { ...this.state }
        dispatch={ this._dispatch }
        subscribe={ this._subscribe }
        unsubscribe={ this._unsubscribe } />;
    }
  };
}