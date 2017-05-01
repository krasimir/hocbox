import React from 'react';
import { mount } from 'enzyme';
import { signal, dispatch, clearLog, getLog, subscribe } from '../../src';

describe('Given the signal helper', function () {
  afterEach(() => {
    clearLog();
  });
  describe('when dispatching a signal', function () {
    it('should receive the data of the signal as a prop', function () {
      const Component = signal(({ firstName, lastName }) => {
        return <p>Hello { firstName } { lastName}</p>;
      });
      const result = mount(<Component firstName lastName />);

      dispatch('firstName', 'Foo');
      dispatch('lastName', 'Bar');

      expect(result.text()).to.equal('Hello Foo Bar');
    });
    describe('and when we subscribe by giving second argument of `signal` method', function () {
      it('should subscribe to the signals', function () {
        const Component = signal(({ firstName, lastName }) => {
          return <p>Hello { firstName } { lastName}</p>;
        }, ['firstName', 'lastName']);
        const result = mount(<Component />);

        dispatch('firstName', 'Foo');
        dispatch('lastName', 'Bar');

        expect(result.text()).to.equal('Hello Foo Bar');
      });
    });
  });
  describe('when we have two components and one of them dispatches a signal', function () {
    it('should receive correct props', function () {
      const ComponentA = signal(({ foo }) => {
        return <p>{ foo }</p>;
      });
      const ComponentB = signal(({ dispatch }) => {
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
      const Component = signal(({ firstName, lastName, unsubscribe }) => {
        unsubscribe('firstName');
        return <p>Hello { firstName } { lastName }</p>;
      });
      const result = mount(<Component firstName lastName/>);

      dispatch('firstName', 'Foo');
      dispatch('lastName', 'Bar');

      expect(result.text()).to.equal('Hello  Bar');
    });
  });
  describe('when we unsubscribe for all signals', function () {
    it('should not rerender', function () {
      const Component = signal(({ firstName, lastName, unsubscribe }) => {
        unsubscribe();
        return <p>Hello { firstName } { lastName }</p>;
      });
      const result = mount(<Component firstName lastName />);

      dispatch('firstName', 'Foo');
      dispatch('lastName', 'Bar');

      expect(result.text()).to.equal('Hello  ');
    });
  });
  describe('when we dispatch multiple signals', function () {
    it('should provide the log hisotry', function () {
      const ComponentA = signal(function CA(props) {
        props.dispatch('tartar', 'A');
        return <p>{ props.foo }</p>;
      });
      const ComponentB = signal(function CB(props) {
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
      const ComponentC = signal(ComponentCClass);

      mount(<ComponentA foo />);
      mount(<ComponentB bar />);
      mount(<ComponentC tartar />);

      expect(getLog()).to.deep.equal([
        { key: 'tartar', data: 'A', source: 'CA_7' },
        { key: 'foo', data: 'B', source: 'CB_8' },
        { key: 'tartar', data: 'A', source: 'CA_7' },
        { key: 'bar', data: 'C', source: 'ComponentCClass_9' },
        { key: 'foo', data: 'B', source: 'CB_8' },
        { key: 'tartar', data: 'A', source: 'CA_7' }
      ])
    });
  });
  describe('when subscribing without signalID', function () {
    it('should still properly subscribe with a uid', function () {
      const spy = sinon.spy();

      subscribe('test-signal', spy);
      dispatch('test-signal', 42);

      expect(spy).to.be.calledWith(42);
    });
  });
  describe('when subscribing using an object', function () {
    it('should properly react on dispatches', function () {
      const spy1 = sinon.spy();
      const spy2 = sinon.spy();

      subscribe({
        'test-signal1': spy1,
        'test-signal2': spy2
      });
      dispatch('test-signal1', 1);
      dispatch('test-signal2', 2);

      expect(spy1).to.be.calledWith(1);
      expect(spy2).to.be.calledWith(2);
    });
  });
});