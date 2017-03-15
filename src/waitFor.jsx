import React from 'react';

export default function waitFor(promise, Component, Replacement = null) {
  return class WaitForComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = { ready: false };
      promise.then(result => {
        this.setState({ ready: true, waitForProps: result });
      });
    }
    render() {
      return this.state.ready ?
        <Component { ...this.props } { ...this.state.waitForProps } /> :
        Replacement !== null ? <Replacement { ...this.props } /> : null;
    }
  }
}