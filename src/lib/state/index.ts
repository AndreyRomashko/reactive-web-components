// Observable state management using rxjs

import { BehaviorSubject } from 'rxjs';

export const createState = (component: any) => {
  const state$ = new BehaviorSubject({});

  component.setState = (newState: any) => {
    const currentState = state$.value;
    state$.next({ ...currentState, ...newState });
  };
  return state$;
};

export const observeState = (component: any, state$: any) => {
  state$.subscribe((state: any) => {
    component.render(state);
  });
};

export const runEffects = (component: any, state$: any) => {
  state$.subscribe((state: any) => {
    component.onEffect(state, component);
  });
};
