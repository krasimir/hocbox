import React from 'react';
import { mount } from 'enzyme';
import hocbox from '../../src';

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
      const component = renderComponent(hocbox.feed(DumpComponent));

      expect(component.text()).to.equal('Hello World');
    });
  });
  describe('when we pass our own props', function () {
    it('should render "Hey dude"', function () {
      const component = renderComponent(hocbox.feed(DumpComponent), { text: 'Hey', name: 'dude' });

      expect(component.text()).to.equal('Hey dude');
    });
  });
  describe('when we feed the component after the first render', function () {
    it('should render "Dear component"', function () {
      const Component = hocbox.feed(DumpComponent);
      const component = renderComponent(Component);

      Component.feed({ text: 'Dear', name: 'React' });
      Component.feed({ text: 'Dear', name: 'component' });

      expect(component.text()).to.equal('Dear component');
    });
  });
  describe('when we feed before to have the component rendered', function () {
    it('should render "Dear programmer"', function () {
      const Component = hocbox.feed(DumpComponent);

      Component.feed({ text: 'Dear', name: 'programmer' });

      const component = renderComponent(Component);

      expect(component.text()).to.equal('Dear programmer');
    });
  });
});
