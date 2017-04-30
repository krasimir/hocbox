# HOCBox

A collection of [Higher-order React components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components)

---

# Installation

`npm i hocbox`

# API

---

## `feed`

<table>
  <tbody>
  <tr>
    <td colspan="2"><strong><code>feed(&lt;component>):&lt;component></code></strong></td>
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
import { feed } from 'hocbox';

// We pass a React Component to feed
const Component = feed(function({ answer }) {
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

*`Service` in the example above is just a HTTP layer that fetches data from let's say API.*

---

## Dependency injection

Provide anything to any React component of your application. The dependencies are `register`ed at the very top layer and via the `wire` method they may reach your components.

<table>
  <tbody>
  <tr>
    <td colspan="2"><strong><code>register(&lt;object>)</code></strong></td>
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
      wire(&lt;component>, &lt;array>, &lt;function>):&lt;component>
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

<table style="width:100%;border-top:solid 4px #999;">
  <tbody>
  <tr>
    <td colspan="2"><strong><code>invalidate()</code></strong></td>
  </tr>
  <tr>
    <td colspan="2">Invalidates the dependencies. Useful when we change some of them and we want to rerender.</td>
  </tr>
  <tr>
    <td><strong>accepts</strong></td>
    <td>nothing</td>
  </tr>
  <tr>
    <td><strong>returns</strong></td>
    <td>nothing</td>
  </tr>
  </tbody>
</table>

```js

// in App.js
import { register } from 'hocbox';

register({ TitleText: 'Hello world' });


// in Title.jsx
import { wire } from 'hocbox';

const Title = function({ text }) {
  return <h1>{ text }</h1>;
}

export default wire(
  Title, // <--- component that needs something
  ['TitleText'], // <--- a key used in the `register` method
  text => ({ text }) // <--- mapping to props function
);
```

## Signals

Passing messages between components and other parts of your system.

<table>
  <tbody>
  <tr>
    <td colspan="2"><strong><code>
      signal(&lt;component>):&lt;component>
    </code></strong></td>
  </tr>
  <tr>
    <td colspan="2">Enhancing React component so it has <code>dispatch</code>, <code>subscribe</code> and <code>unsubscribe</code> methods as props.</td>
  </tr>
  <tr>
    <td><strong>accepts</strong></td>
    <td>React component</td>
  </tr>
  <tr>
    <td><strong>returns</strong></td>
    <td>Enhanced React component</td>
  </tr>
  </tbody>
</table>

<table>
  <tbody>
  <tr>
    <td colspan="2"><strong><code>
      subscribe(&lt;string>, &lt;function>)
    </code></strong></td>
  </tr>
  <tr>
    <td colspan="2">Subscribing to a signal</td>
  </tr>
  <tr>
    <td><strong>accepts</strong></td>
    <td>
      <ul>
        <li>Name of the signal</li>
        <li>Callback</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><strong>returns</strong></td>
    <td>nothing</td>
  </tr>
  </tbody>
</table>