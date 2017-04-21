# HOCBox

A collection of [Higher-order React components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components)

---

## Installation

`npm i hocbox`

## API

### `feed`

> For the cases when we want to rerender a component with given props

<table>
  <tbody>
  <tr>
    <td colspan="2" align="center"><strong><code>feed</code></strong></td>
  </tr>
  <tr>
    <td><strong>accepts</strong></td>
    <td>React component</td>
  </tr>
  <tr>
    <td><strong>returns</strong></td>
    <td>React Component with a static method `feed`</td>
  </tr>
  </tbody>
</table>


```js
import hocbox from 'hocbox';

// We pass a React Component to hocbox.feed
const Component = hocbox.feed(function({ answer }) {
  return <p>The answer is { answer || '...' }</p>;
});

// ... and we render our Component
class App extends React.Component {
  render() {
    return <div><Component /></div>;
  }
}

// Then later we rerender with given props
Service('/api/get/the/answer').then(data => {
  Component.feed({ answer: data });
});


```

*`Service` in the exampe above is just a HTTP layer that fetches data from let's say API.*

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