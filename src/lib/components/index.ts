// Wrapper over web components API with observable state and effects

import { EventHandling, mountEvents } from "../events";
import { createState, observeState, runEffects } from "../state";

export class ReactiveComponent extends HTMLElement {
  public state$: any;
  public routerState$: any;
  public eventHandlings: any;
  constructor() {
    super();
    this.state$ = createState(this);
  }
  render(state: any, component: ReactiveComponent): any {}
  setState(state: any): any {}
  navigate(pathname: string): any {}
  setRouterState(state: any): any {}
  onEffect(effect: (state: any) => any): any {}
  connectedCallback() {
    observeState(this, this.state$);
    this.eventHandlings && mountEvents(this.eventHandlings, this.state$, this);
    runEffects(this, this.state$);
  }
}

export const registerComponent = (tagName: string, componentClass: any, extendsTagName?: string) => {
  customElements.define(tagName, componentClass, {extends: extendsTagName});
};

type ReactiveFunction = (state: any, component: ReactiveComponent) => any;

export function createFunctionalComponent(
  render: ReactiveFunction,
  defaultState: any,
  eventHandlings: EventHandling[],
  onEffect: ReactiveFunction
) {
  return class FunctionalReactiveComponent extends ReactiveComponent {
    constructor() {
      super();
      this.eventHandlings = eventHandlings;
      this.render = (state: any) => render(state, this);
      this.onEffect = (state: any) => onEffect(state, this);
      this.setState(defaultState);
    }
  };
}
