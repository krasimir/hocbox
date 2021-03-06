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
      const component = renderComponent(feed(DumpComponent));

      expect(component.text()).to.equal('Hello World');
    });
  });
  describe('when we pass our own props', function () {
    it('should render "Hey dude"', function () {
      const component = renderComponent(feed(DumpComponent), { text: 'Hey', name: 'dude' });

      expect(component.text()).to.equal('Hey dude');
    });
  });
  describe('when we feed the component after the first render', function () {
    it('should render "Dear component"', function () {
      const Component = feed(DumpComponent);
      const component = renderComponent(Component);

      Component.feed({ text: 'Dear', name: 'React' });
      Component.feed({ text: 'Dear', name: 'component' });

      expect(component.text()).to.equal('Dear component');
    });
  });
  describe('when we feed before to have the component rendered', function () {
    it('should render "Dear programmer"', function () {
      const Component = feed(DumpComponent);

      Component.feed({ text: 'Dear', name: 'programmer' });

      const component = renderComponent(Component);

      expect(component.text()).to.equal('Dear programmer');
    });
  });
  describe('when we need to control two difference instance', function () {
    it('should feed them separately', function () {
      const Component = feed(DumpComponent);
      const feed1 = () => ({ text: 'Dear', name: 'developer' });
      const feed2 = () => ({ text: 'Dear', name: 'designer' });


      const component1 = renderComponent(Component, { feeder: feed1 });
      const component2 = renderComponent(Component, { feeder: feed2 });

      Component.feed();

      expect(component1.text()).to.equal('Dear developer');
      expect(component1.text()).to.not.equal('Dear designer');
      expect(component2.text()).to.equal('Dear designer');
      expect(component2.text()).to.not.equal('Dear developer');
    });
  });
});
