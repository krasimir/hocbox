import React from 'react';

var SignalStorage = {};
var SignalComponentID = 0;

export function dispatch(key, data) {
  if (SignalStorage[key]) {
    Object.keys(SignalStorage[key]).forEach(id => SignalStorage[key][id](data));
  }
}
export function subscribe(key, signalID, callback) {
  if (!SignalStorage[key]) SignalStorage[key] = {};
  if (!SignalStorage[key][signalID]) {
    SignalStorage[key][signalID] = callback;
  }
}

export function signal(Component) {
  return class SignalComponent extends React.Component {
    constructor(props) {
      super(props);

      this._signalID = ++SignalComponentID;
      this._dispatch = dispatch;
      this._subscribe = (...keys) => {
        keys.forEach(key => {
          subscribe(key, this._signalID, data => this.setState({ [key]: data }))
        });
      }
    }
    render() {
      return <Component
        { ...this.props }
        { ...this.state }
        dispatch={ this._dispatch }
        subscribe={ this._subscribe } />;
    }
  };
}