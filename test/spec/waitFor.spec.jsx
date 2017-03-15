import React from 'react';
import { mount } from 'enzyme';
import waitFor from '../../src/waitFor.jsx';

class DumpComponent extends React.Component {
  render() {
    return (
      <p>
        { this.props.text || 'Hello world' }
        { this.props.name || '' }
      </p>
    )
  }
}

function renderComponent(Component, props = {}) {
  return mount(<Component { ...props } />);
}

describe('Given the waitFor helper', function () {
  describe('when rendering with unresolved promise', function () {
    it('should render nothing', function () {
      const component = renderComponent(waitFor(new Promise(() => {})), DumpComponent);

      expect(component.find('p')).to.have.length(0);
    });
    describe('and when we provide a replacement', function () {
      it('should render the replacement', function () {
        const component = renderComponent(waitFor(
          new Promise(() => {}),
          DumpComponent,
          () => <p>Replacement</p>
        ));

        expect(component.text()).to.equal('Replacement');
      });
    });
  });
  describe('when rendering with resolved promise', function () {
    it('should render nothing', function () {
      const resolved = Promise.resolve();
      const component = renderComponent(waitFor(resolved, DumpComponent));

      return resolved.then(() => {
        expect(component.find('p')).to.have.length(1);
      });
    });
  });
  describe('when we resolve later', function () {
    it('should render the component once the promise is resolved', function () {
      const request = new Promise(resolve => {
        setTimeout(resolve, 200);
      });
      const component = renderComponent(waitFor(request, DumpComponent));

      return request.then(() => {
        expect(component.text()).to.equal('Hello world');
      });
    });
    describe('and we pass some props', function () {
      it('should pass the props to the enhanced component', function () {
        const request = new Promise(resolve => {
          setTimeout(function () {
            resolve({ text: 'Hey '});
          }, 200);
        });
        const component = renderComponent(waitFor(request, DumpComponent), {
          name: 'Foo'
        });

        return request.then(() => {
          expect(component.text()).to.equal('Hey Foo');
        });
      });
    });
  });
})