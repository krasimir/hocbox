# HOCBox

A collection of [Higher-order React components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components)

---

## Installation

`npm i hocbox`

## API

### `feed`

> For the cases when we want to rerender a component with given props

```js
import hocbox from 'hocbox';

const Component = function({ answer }) {
  return <p>The answer is { answer || '...' }</p>;
};

const UI = hocbox.feed(Component);

Service('/api/get/the/answer').then(data => {
  UI.feed({ answer: data });
});
```

`Service` in the exampe above is just a HTTP layer that fetches data from let's say API.

### `Dependency injection`

> For the cases where we want to pass value/configuration/something to a component but it is deeper in our tree

```js
// in App.js
hocbox.register({ TitleText: 'Hello world' });

// in Title.jsx
const Title = function({ text }) {
  return <h1>{ text }</h1>;
}

export default hocbox.wire(
  Title, // <--- component that needs something
  ['TitleText'], // <--- a key used in the `register` method
  text => ({ text }) // <--- mapping to props function
);
```