import { ReactiveComponent } from "../components";

export type EventHandling = {
  selector: string;
  eventName: string;
  handler: (data : {event: Event, state: any, component: ReactiveComponent}) => void;
};
export const mountEvents = (
  eventHandlings: EventHandling[],
  state: any,
  component: any
) => {
  const registeredEventListeners: Map<
    Element,
    Map<string, EventListener>
  > = new Map();

  const removeEventListeners = () => {
    registeredEventListeners.forEach((eventMap, element) => {
      eventMap.forEach((listener, eventName) => {
        element.removeEventListener(eventName, listener);
      });
    });
    registeredEventListeners.clear();
  };

  state.subscribe((state: any) => {
    removeEventListeners();

    eventHandlings.forEach(({ selector, eventName, handler }) => {
      if (selector) {
        const element = component.querySelector(selector);
        if (element) {
          const listener = (event: Event) => handler({event, state, component});

          element.addEventListener(eventName, listener);

          if (!registeredEventListeners.has(element)) {
            registeredEventListeners.set(element, new Map());
          }
          registeredEventListeners.get(element)?.set(eventName, listener);
        }
      }
    });
  });
};
