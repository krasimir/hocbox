# HOCBox

A collection of [Higher-order React components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components)

---

## Installation

`npm i hocbox`

## Simple usage

### `feed`

```js
class DumpComponent extends React.Component {
  render() {
    return <p>{ `${ this.props.text } ${ this.props.name }` }</p>;
  }
}

const { set, Component } = feed(DumpComponent);

// render your component
<Component />

// sometime after that
set({ text: 'Hello', name: 'World' });

// we triggered a new render and we have "Hello World" on the screen
```