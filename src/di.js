import React from 'react';

var Data = {};

function dependenciesToProps(dependencies, mapToProps, storage) {
  const deps = dependencies.map(key => {
    if (Data[storage][key]) return Data[storage][key];
    throw new Error(`Hocbox: Missing dependency with key = "${ key }"`);
  });

  return mapToProps.apply({}, deps);
}
function registerDependenciesToPropsCallback(func, storage) {
  if (!Data[storage]) Data[storage] = {};
  if (!Data[storage].___dependenciesToProps___) Data[storage].___dependenciesToProps___ = [];
  Data[storage].___dependenciesToProps___.push(func);
}

export function clear() {
  Data = {};
}

export function invalidate(storage = 'hocbox') {
  if (!Data[storage]) Data[storage] = {};
  if (!Data[storage].___dependenciesToProps___) Data[storage].___dependenciesToProps___ = [];
  Data[storage].___dependenciesToProps___.forEach(f => f());
}

export function register(dependencies, storage = 'hocbox') {
  if (!Data[storage]) Data[storage] = {};
  Object.keys(dependencies).forEach(key => Data[storage][key] = dependencies[key]);
}

export function wire(Component, dependencies, mapToProps, storage = 'hocbox') {
  const _getDepsProps = dependenciesToProps.bind({}, dependencies, mapToProps, storage);
  var _listener;

  registerDependenciesToPropsCallback(() => _listener && _listener(), storage);

  return class DIComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = { depsProps: _getDepsProps() }
      _listener = () => this.setState({ depsProps: _getDepsProps() });
    }
    render() {
      return <Component { ...this.props } { ...this.state.depsProps } />;
    }
  }
}