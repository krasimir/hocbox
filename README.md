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

class App extends React.Component {
  render() {
    return (
      <div>
        <Title />
        <button onClick={ this._buttonClicked }>Click me</button>
      </div>
    );
  }
  _buttonClicked() {
    Title.feed({ text: 'Hello world' });
  }
}
```