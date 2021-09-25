import { PayloadAction } from "@reduxjs/toolkit";

/*
 * Function that wraps a thunk action that always resolves an action (no matter
 * if thunk fails or succeeds) into a promise that resolves if the thunk
 * succeeded and rejects if the thunk didn't.
 */

export const wrapThunkAction = (promise: Promise<any>) =>
  new Promise<PayloadAction>((resolve, reject) => {
    promise.then((action: any) => {
      if (/\w+\/fulfilled$/.test(action.type)) {
        resolve(action);
      } else {
        reject(action);
      }
    });
  });
