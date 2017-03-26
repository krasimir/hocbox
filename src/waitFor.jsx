
import React from 'react';

export default function waitFor(Component) {
  var _listener;
  var _defaultWaitForProps = {};
  var _ready = false;

  return {
    Component: class FeedComponent extends React.Component {
      constructor(props) {
        super(props);

        this.state = { waitForProps: _defaultWaitForProps }
        _listener = waitForProps => this.setState({ waitForProps });
      }
      render() {
        return _ready ? <Component { ...this.props } { ...this.state.waitForProps } /> : null;
      }
    },
    done: function (props) {
      _defaultWaitForProps = props;
      _ready = true;
      if (_listener) _listener(props);
    }
  }
}