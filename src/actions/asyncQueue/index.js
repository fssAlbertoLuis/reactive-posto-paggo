import {AsyncQueue} from '../actionTypes';

export const pushToQueue = (message) => ({
  type: AsyncQueue.PUSH,
  message,
});

export const popFromQueue = () => ({
  type: AsyncQueue.POP,
});
