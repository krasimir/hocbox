
import React from 'react';

export default function waitFor(Component) {
  var _listener;
  var _defaultWaitForProps = {};
  var _ready = false;

  return class FeedComponent extends React.Component {
    static done(props) {
      _defaultWaitForProps = props;
      _ready = true;
      if (_listener) _listener(props);
    }
    constructor(props) {
      super(props);

      this.state = { waitForProps: _defaultWaitForProps }
      _listener = waitForProps => this.setState({ waitForProps });
    }
    render() {
      return _ready ? <Component { ...this.props } { ...this.state.waitForProps } /> : null;
    }
  };
}