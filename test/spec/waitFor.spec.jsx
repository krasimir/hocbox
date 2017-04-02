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

describe('Given the waitFor helper', function () {
  describe('when initial rendering', function () {
    it('should render nothing', function () {
      const Component = hocbox.waitFor(DumpComponent);
      const component = renderComponent(Component);

      expect(component.find('p')).to.have.length(0);
    });
  });
  describe('when calling the "done" callback', function () {
    it('should render "Hey dude"', function () {
      const Component = hocbox.waitFor(DumpComponent);
      const component = renderComponent(Component);

      Component.done({ text: 'Hey', name: 'dude' })

      expect(component.text()).to.equal('Hey dude');
    });
  });
});
