# HOCBox

A collection of [Higher-order React components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components)

---

## Installation

`npm i hocbox`

## API

### `feed`

> For the cases where we want to rerender a component with given props

```js
// Title.jsx
import hocbox from 'hocbox';

class Title extends React.Component {
  render() {
    return <p>{ this.props.text }</p>;
  }
}

export default hocbox.feed(Title);

// app.js
import Title from './Title.jsx';

// render your component
<Title />

// sometime after that
Title.feed({ text: 'Hello' });

// we triggered a new render and we have "Hello" on the screen
```