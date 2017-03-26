import React from 'react';
import { mount } from 'enzyme';
import { feed } from '../../src';

class DumpComponent extends React.Component {
  render() {
    return (
      <p>{ `${ this.props.text || 'Hello' } ${ this.props.name || 'World' }` }</p>
    )
  }
}

function renderComponent(Component, props = {}) {
  return mount(<Component { ...props } />);
}

describe('Given the food helper', function () {
  describe('when rendering the component', function () {
    it('should render "Hello world"', function () {
      const { set, Component } = feed(DumpComponent);
      const component = renderComponent(Component);

      expect(component.text()).to.equal('Hello World');
    });
  });
  describe('when we pass our own props', function () {
    it('should render "Hey dude"', function () {
      const { set, Component } = feed(DumpComponent);
      const component = renderComponent(Component, { text: 'Hey', name: 'dude' });

      expect(component.text()).to.equal('Hey dude');
    });
  });
  describe('when we feed the component after the first render', function () {
    it('should render "Dear component"', function () {
      const { set, Component } = feed(DumpComponent);
      const component = renderComponent(Component);

      set({ text: 'Dear', name: 'React' });
      set({ text: 'Dear', name: 'component' });

      expect(component.text()).to.equal('Dear component');
    });
  });
  describe('when we feed before to have the component rendered', function () {
    it('should render "Dear programmer"', function () {
      const { set, Component } = feed(DumpComponent);
      set({ text: 'Dear', name: 'programmer' });

      const component = renderComponent(Component);

      expect(component.text()).to.equal('Dear programmer');
    });
  });
});
