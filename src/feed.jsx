
import React from 'react';

export default function feed(Component) {
  var _listener;
  var _defaultFeedProps = {};

  return {
    Component: class FeedComponent extends React.Component {
      constructor(props) {
        super(props);

        this.state = { feedProps: _defaultFeedProps }
        _listener = feedProps => this.setState({ feedProps });
      }
      render() {
        return <Component { ...this.props } { ...this.state.feedProps } />;
      }
    },
    set: function (props) {
      _defaultFeedProps = props;
      if (_listener) _listener(props);
    }
  }
}