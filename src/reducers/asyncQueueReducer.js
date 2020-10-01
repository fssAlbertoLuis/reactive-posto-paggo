import {AsyncQueue} from '../actions/actionTypes';

const initialQueue = [];

export const asyncQueueReducer = (state = initialQueue, action) => {
  switch (action.type) {
    case AsyncQueue.PUSH:
      return [...state, action.message];
    case AsyncQueue.POP:
      const newState = state;
      newState.shift();
      return [...newState];
    default:
      return state;
  }
};
