# HOCBox

A collection of [Higher-order React components](https://github.com/krasimir/react-in-patterns/tree/master/patterns/higher-order-components)

---

## Installation

`npm i hocbox`

## Features

The HOCs here are single-job utility functions that help developing React applications without the hustle of learning a new framework. Simple functions doing simple things!

### waitFor

`waitFor` is useful when you want to render a component with some delay. For example you don't have the data yet. Calling `waitFor` and passing your original component results in a function and higher-order component.

```js
import { waitFor } from 'hocbox';
import MyComponent from './MyComponent.jsx';

const { done, Component } = waitFor(MyComponent);

// feel free to render <Component /> now
<Component />

// now do some async work
getData().then(function (result) {

  // fire done() when you are ready
  // and your original component will be displayed on the screen
  done({ items: result.items });
});

```

