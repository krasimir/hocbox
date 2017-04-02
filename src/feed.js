
import React from 'react';

export default function feed(Component) {
  var _listener;
  var _defaultFeedProps = {};

  return class FeedComponent extends React.Component {
    static feed(props) {
      _defaultFeedProps = props;
      if (_listener) _listener(props);
    }
    constructor(props) {
      super(props);

      this.state = { feedProps: _defaultFeedProps }
      _listener = feedProps => this.setState({ feedProps });
    }
    render() {
      return <Component { ...this.props } { ...this.state.feedProps } />;
    }
  };
}