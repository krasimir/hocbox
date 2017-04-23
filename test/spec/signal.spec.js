import React from 'react';
import { mount } from 'enzyme';
import hocbox from '../../src';

describe('Given the signal helper', function () {
  beforeEach(() => {
    hocbox.clearLog();
  });
  describe('when dispatching a signal', function () {
    it('should receive the data of the signal as a prop', function () {
      const Component = hocbox.signal(({ firstName, lastName }) => {
        return <p>Hello { firstName } { lastName}</p>;
      });
      const result = mount(<Component firstName lastName />);

      hocbox.dispatch('firstName', 'Foo');
      hocbox.dispatch('lastName', 'Bar');

      expect(result.text()).to.equal('Hello Foo Bar');
    });
  });
  describe('when we have two components and one of them dispatches a signal', function () {
    it('should receive correct props', function () {
      const ComponentA = hocbox.signal(({ foo }) => {
        return <p>{ foo }</p>;
      });
      const ComponentB = hocbox.signal(({ dispatch }) => {
        dispatch('foo', 'bar');
        return <p>Bar</p>;
      });

      const resultA = mount(<ComponentA foo />);
      mount(<ComponentB />);

      expect(resultA.text()).to.equal('bar');
    });
  });
  describe('when we unsubscribe for particular signal', function () {
    it('should not rerender', function () {
      const Component = hocbox.signal(({ firstName, lastName, unsubscribe }) => {
        unsubscribe('firstName');
        return <p>Hello { firstName } { lastName }</p>;
      });
      const result = mount(<Component firstName lastName/>);

      hocbox.dispatch('firstName', 'Foo');
      hocbox.dispatch('lastName', 'Bar');

      expect(result.text()).to.equal('Hello  Bar');
    });
  });
  describe('when we unsubscribe for all signals', function () {
    it('should not rerender', function () {
      const Component = hocbox.signal(({ firstName, lastName, unsubscribe }) => {
        unsubscribe();
        return <p>Hello { firstName } { lastName }</p>;
      });
      const result = mount(<Component firstName lastName />);

      hocbox.dispatch('firstName', 'Foo');
      hocbox.dispatch('lastName', 'Bar');

      expect(result.text()).to.equal('Hello  ');
    });
  });
  describe('when we dispatch multiple signals', function () {
    it('should provide the log hisotry', function () {
      const ComponentA = hocbox.signal(function CA(props) {
        props.dispatch('tartar', 'A');
        return <p>{ props.foo }</p>;
      });
      const ComponentB = hocbox.signal(function CB(props) {
        props.dispatch('foo', 'B');
        return <p>{ props.bar }</p>;
      });
      class ComponentCClass extends React.Component {
        constructor(props) {
          super(props);
          props.dispatch('bar', 'C');
        }
        render() {
          return <p>{ this.props.tartar }</p>;
        }
      }
      const ComponentC = hocbox.signal(ComponentCClass);

      mount(<ComponentA foo />);
      mount(<ComponentB bar />);
      mount(<ComponentC tartar />);

      expect(hocbox.getLog()).to.deep.equal([
        { key: 'tartar', data: 'A', source: 'CA_6' },
        { key: 'foo', data: 'B', source: 'CB_7' },
        { key: 'tartar', data: 'A', source: 'CA_6' },
        { key: 'bar', data: 'C', source: 'ComponentCClass_8' },
        { key: 'foo', data: 'B', source: 'CB_7' },
        { key: 'tartar', data: 'A', source: 'CA_6' }
      ])
    });
  });
});