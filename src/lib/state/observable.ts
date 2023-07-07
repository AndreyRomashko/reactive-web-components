// Wrapper for creating observables

import { BehaviorSubject } from 'rxjs';

export const createObservable = (initialValue: any) => {
  const observable$ = new BehaviorSubject(initialValue);

  const set = (value: any) => {
    observable$.next(value);
  };

  const get = () => {
    return observable$.value;
  };

  const subscribe = (callback: any) => {
    return observable$.subscribe(callback);
  };

  return {
    set,
    get,
    subscribe,
  };
};
