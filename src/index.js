import feed from './feed';
import { wire, register, invalidate, clear } from './di';
import { signal, dispatch, subscribe } from './signal';

export default {
  feed,
  wire,
  register,
  invalidate,
  clear,
  signal,
  dispatch,
  subscribe
};
