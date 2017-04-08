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