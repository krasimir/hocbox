import React from 'react';
import { mount } from 'enzyme';
import hocbox from '../../src';

function renderComponent(Component, props = {}) {
  return mount(<Component { ...props } />);
}

describe('Given the signal helper', function () {
  describe('when dispatching a signal', function () {
    it('should receive the data of the signal as a prop', function () {
      const Component = ({ subscribe, firstName, lastName }) => {
        subscribe('firstName', 'lastName');
        return <p>Hello { firstName } { lastName}</p>;
      }
      const result = renderComponent(hocbox.signal(Component));

      hocbox.dispatch('firstName', 'Foo');
      hocbox.dispatch('lastName', 'Bar');

      expect(result.text()).to.equal('Hello Foo Bar');
    });
  });
  describe('when we have two components dispatching signals', function () {
    it('should receive correct props', function () {
      const ComponentA = ({ subscribe, dispatch, foo }) => {
        subscribe('foo');
        return <p>{ foo }</p>;
      }
      const ComponentB = ({ dispatch }) => {
        dispatch('foo', 'bar');
        return <p>Bar</p>;
      }

      const resultA = renderComponent(hocbox.signal(ComponentA));
      renderComponent(hocbox.signal(ComponentB));

      expect(resultA.text()).to.equal('bar');
    });
  });
});