
import React from 'react';

export function feed(Component) {
  var _listeners = [];
  var _defaultFeedProps = {};

  return class FeedComponent extends React.Component {
    static feed(props) {
      _defaultFeedProps = props;
      if (_listeners.length > 0) _listeners.forEach(l => l(props));
    }
    constructor(props) {
      super(props);

      this.state = { feedProps: _defaultFeedProps };

      if (props.feeder) {
        _listeners.push(() => this.setState({ feedProps: props.feeder() }));
      } else {
        _listeners.push(feedProps => this.setState({ feedProps }));
      }
    }
    render() {
      return <Component { ...this.props } { ...this.state.feedProps } />;
    }
  };
}