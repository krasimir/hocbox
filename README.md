# HOCBox

A collection of [Higher-order React components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components)

---

## Installation

`npm i hocbox`

## API

### `feed`

<table>
  <tbody>
  <tr>
    <td colspan="2"><strong><code>hocbox.feed(&lt;component>):&lt;component></code></strong></td>
  </tr>
  <tr>
    <td colspan="2">For the cases when we want to rerender a component with given props</td>
  </tr>
  <tr>
    <td><strong>accepts</strong></td>
    <td>React component</td>
  </tr>
  <tr>
    <td><strong>returns</strong></td>
    <td>Enhanced React Component with a static method `feed`</td>
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

<table>
  <tbody>
  <tr>
    <td colspan="2"><strong><code>hocbox.register(&lt;object>)</code></strong></td>
  </tr>
  <tr>
    <td colspan="2">Defines dependencies</td>
  </tr>
  <tr>
    <td><strong>accepts</strong></td>
    <td>Object of key-value props</td>
  </tr>
  <tr>
    <td><strong>returns</strong></td>
    <td>nothing</td>
  </tr>
  </tbody>
</table>

<table>
  <tbody>
  <tr>
    <td colspan="2"><strong><code>
      hocbox.wire(&lt;component>, &lt;array>, &lt;function>)
    </code></strong></td>
  </tr>
  <tr>
    <td colspan="2">We describe what dependencies we need and map them to props sent to our component.</td>
  </tr>
  <tr>
    <td><strong>accepts</strong></td>
    <td>
      <ul>
        <li>React component</li>
        <li>Array of strings where every string is a key used in the <code>register</code> method</li>
        <li>Function that accepts the dependencies and has to return an object of key-value props</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><strong>returns</strong></td>
    <td>Enhanced React component</td>
  </tr>
  </tbody>
</table>

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