# Reactive Web Components Library

A lightweight frontend framework for creating modern web apps using pure web components API with observable state and effects.

## Table of Contents

- [Installation](#installation)
- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
  - [Creating a Reactive Component](#creating-a-reactive-component)
  - [Creating a Functional Reactive Component](#creating-a-functional-reactive-component)
  - [Registering a Component](#registering-a-component)
  - [Rendering and State](#rendering-and-state)
  - [Running Effects](#running-effects)
  - [Handling Events](#handling-events)
  - [Router](#router)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use the Reactive Web Components library, you need to have Node.js and npm (Node Package Manager) installed. Then, you can install the library by running the following command:

```shell
npm install reactive-web-components
```

## Introduction

Reactive Web Components is a lightweight frontend framework that enables you to create modern web applications using pure web components API with observable state and effects. It provides a simple and efficient way to build interactive UI components with reactive rendering, event handling, and a built-in router for single-page applications.

## Features

- Reactive rendering of UI components based on observable state.
- Observable state management using RxJS.
- Support for running effects when the state changes.
- Automatic event listener management for handling events.
- Router for building single-page applications with multiple views.

## Usage

### Creating a Reactive Component

To create a reactive component, you need to extend the `ReactiveComponent` class provided by the library. Here's an example:

```javascript
import { ReactiveComponent, registerComponent } from "reactive-web-components";

export class Counter extends ReactiveComponent {
  constructor() {
    super();
    // Initialize component state
    this.state = { count: 0 };
    // Set the initial state
    this.setState(this.state);
  }

  eventHandlings = [
    {
      selector: "#incrementButton",
      eventName: "click",
      handler: this.incrementCount,
    },
    {
      selector: "#decrementButton",
      eventName: "click",
      handler: this.decrementCount,
    },
  ];

  incrementCount = () => {
    this.state.count++;
    this.setState(this.state);
  };

  decrementCount = () => {
    this.state.count--;
    this.setState(this.state);
  };

  render(state) {
    this.innerHTML = `
      <div>
        <h1>Count: ${state.count}</h1>
        <button id="incrementButton">Increment</button>
        <button id="decrementButton">Decrement</button>
      </div>
    `;
  }
}

registerComponent("counter-component", Counter);
```

In the above example, the `Counter` component extends the `ReactiveComponent` class and overrides the `render` method to define the rendering logic based on the component's state. The `state` argument represents the current state of the component. The `eventHandlings` property specifies the event handlers for handling button clicks, and the `incrementCount` and `decrementCount` methods update the state and trigger a re-render of the component.

### Creating a Functional Reactive Component

Reactive Web Components also provides a utility function `createFunctionalComponent` to create functional reactive components. Here's an example:

```javascript
import {
  registerComponent,
  createFunctionalComponent,
} from "reactive-web-components";

const initialState = { count: 0 };

const eventHandlings = [
  {
    selector: "#incrementButton",
    eventName: "click",
    handler: ({ state, component }) => {
      state.count++;
      component.setState(state);
    },
  },
  {
    selector: "#decrementButton",
    eventName: "click",
    handler: ({ state, component }) => {
      state.count--;
      component.setState(state);
    },
  },
];

const render = (state, component) => {
  component.innerHTML = `
  <div>
    <h1>Count: ${state.count}</h1>
    <button id="incrementButton">Increment</button>
    <button id="decrementButton">Decrement</button>
  </div>
`;
};

const Counter = createFunctionalComponent(render, initialState, eventHandlings);

registerComponent("counter-component", Counter);
```

In the above example, the `Counter` component is created using the `createFunctionalComponent` function. It takes a rendering function, initial state, and event handlings as arguments. The rendering function defines the component's HTML markup based on the state, and the event handlings specify the event handlers for button clicks.

### Registering a Component

To use your reactive components, you need to register them as custom elements using the `registerComponent` function. Here's an example:

```javascript
import { registerComponent } from "reactive-web-components";

registerComponent("counter-component", Counter);
```

In the above example, the `

Counter`component is registered as a custom element with the tag name`'counter-component'`. Once registered, you can use the component in your HTML markup by including the corresponding tag.

### Rendering and State

In a reactive component, the `render` method is responsible for defining the component's rendering logic based on its state. The `state` argument represents the current state of the component and can be accessed within the `render` method. When the state changes, the `render` method is automatically triggered to update the component's HTML markup.

To update the state of a component, you can use the `setState` method provided by the `ReactiveComponent` base class. This method takes a new state object as an argument and triggers a re-render of the component. Here's an example:

```javascript
this.state = { count: 0 };
this.setState(this.state);
```

In the above example, the initial state is set to `{ count: 0 }`, and the `setState` method is called to trigger the initial rendering of the component.

### Running Effects

Effects are functions that run when the state of a component changes. Reactive Web Components provides the `onEffect` method to define an effect for a component. Here's an example:

```javascript
this.onEffect = ({ state }) => {
  console.log("Effect: Count =", state.count);
};
```

In the above example, the `onEffect` method is assigned a function that logs the count value of the component's state whenever it changes.

### Handling Events

Reactive Web Components simplifies event handling by automatically managing event listeners based on the event handlings defined for a component. The `eventHandlings` property of a component specifies the event handlers for handling events. Each event handling object has `selector`, `eventName`, and `handler` properties.

Here's an example:

```javascript
eventHandlings = [
  {
    selector: "#incrementButton",
    eventName: "click",
    handler: this.incrementCount,
  },
  {
    selector: "#decrementButton",
    eventName: "click",
    handler: this.decrementCount,
  },
];
```

In the above example, the event handlings are defined for handling button click events. The `selector` specifies the target element(s) for the event listener, the `eventName` is the event to listen for, and the `handler` is the function that will be called when the event occurs. Inside the event handling function, you can access the component's state and update it using `setState`.

### Router

Reactive Web Components includes a router for building single-page applications with multiple views. To use the router, you need to define routes and create a `Router` instance. Here's an example:

```javascript
import { Router } from "reactive-web-components";
import { News } from "./pages/News";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";

const routes = [
  { path: "/", component: Home },
  { path: "/news", component: News },
  { path: "/products", component: Products },
];

const router = new Router(routes, "router-outlet");
```

In the above example, `routes` is an array of route objects, where each object specifies the path and the corresponding component for that path. The `Router` class takes the routes array as a parameter and handles the routing logic. The second parameter, `'router-outlet'`, specifies the tag name of the router outlet where the components will be rendered.

To navigate between routes, you can use the `navigateTo` method provided by the router instance:

```javascript
router.navigateTo("/news");
```

You can also set data for the current route using the `setData` method:

```javascript
router.setData({ someData: "example" });
```

To get the current router state, you can subscribe to the `getRouterState` method:

```javascript
router.getRouterState().subscribe((routerState) => {
  // Access the current path and data from the router state
});
```

For more details and examples, please refer to the [API Reference](#api-reference) section.

## Examples

Here are some examples of how to use Reactive Web Components in different scenarios:

### Example 1: Counter Component

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Counter Component</title>
    <script type="module" src="index.js"></script>
  </head>
  <body>
    <counter-component></counter-component>
  </body>
</html>
```

```javascript
import { ReactiveComponent, registerComponent } from "reactive-web-components";

export class Counter extends ReactiveComponent {
  constructor() {
    super();
    this.state = { count: 0 };
    this.setState(this.state);
  }

  eventHandlings = [
    {
      selector: "#incrementButton",
      eventName: "click",
      handler: this.incrementCount,
    },
    {
      selector: "#decrementButton",
      eventName: "click",
      handler: this.decrementCount,
    },
  ];

  incrementCount = () => {
    this.state.count++;
    this.setState(this.state);
  };

  decrementCount = () => {
    this.state.count--;
    this.setState(this.state);
  };

  render(state) {
    this.innerHTML = `
      <div>
        <h1>Count: ${state.count}</h1>
        <button id="incrementButton">Increment</button>
        <button id="decrementButton">Decrement</button>
      </div>
    `;
  }
}

registerComponent("counter-component", Counter);
```

### Example 2: Todo List Component

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo List Component</title>
    <script type="module" src="index.js"></script>
  </head>
  <body>
    <todo-list-component></todo-list-component>
  </body>
</html>
```

```javascript
import { ReactiveComponent, registerComponent } from "reactive-web-components";

export class TodoList extends ReactiveComponent {
  constructor() {
    super();
    this.state = { todos: [] };
    this.setState(this.state);
  }

  eventHandlings = [
    {
      selector: "#addButton",
      eventName: "click",
      handler: this.addTodo,
    },
    {
      selector: ".deleteButton",
      eventName: "click",
      handler: this.deleteTodo,
    },
  ];

  addTodo = () => {
    const todoInput = document.querySelector("#todoInput");
    const todo = todoInput.value;
    if (todo) {
      this.state.todos.push(todo);
      this.setState(this.state);
      todoInput.value = "";
    }
  };

  deleteTodo = ({ event }) => {
    const index = event.target.dataset.index;
    this.state.todos.splice(index, 1);
    this.setState(this.state);
  };

  render(state) {
    this.innerHTML = `
      <div>
        <h2>Todo List</h2>
        <input type="text" id="todoInput" placeholder="Add a new todo">
        <button id="addButton">Add</button>
        <ul>
          ${state.todos
            .map(
              (todo, index) => `
            <li>${todo} <button data-index="${index}" class="deleteButton">Delete</button></li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;
  }
}

registerComponent("todo-list-component", TodoList);
```

### Example 3: Router Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Router Example</title>
    <script type="module" src="index.js"></script>
  </head>
  <body>
    <nav-component></nav-component>
    <router-outlet></router-outlet>
  </body>
</html>
```

```javascript
import {
  ReactiveComponent,
  registerComponent,
  Router,
} from "reactive-web-components";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
];

const router = new Router(routes, "router-outlet");

registerComponent("nav-component", Nav);
```

In the above examples, we demonstrated how to use Reactive Web Components to create a counter component, a todo list component, and a router component for navigating between different views in a single-page application.

For more examples and usage scenarios, please refer to the [Examples](#examples) section.

## API Reference

### `ReactiveComponent`

A base class for creating reactive components.

**Methods:**

- `render(state)`: Defines the rendering logic of the component based on its state.

- `setState(newState)`: Updates the state of the component with the new state.

- `onEffect({ state })`: Defines an effect to run when the state changes.

- `connectedCallback()`: Callback method invoked when the component is connected to the DOM.

**Properties:**

- `state`: The current state of the component.

**Static Method:**

- `registerComponent(tagName, componentClass)`: Registers a component as a custom element with the specified tag name.

### `registerComponent(tagName, componentClass)`

A function to register a component as a custom element with the specified tag name.

**Arguments:**

- `tagName`: The tag name for the custom element.

- `componentClass`: The component class to be registered.

### `createFunctionalComponent(render, initialState, eventHandlings, onEffect)`

A function to create a functional reactive component.

**Arguments:**

- `render(state, component)`: A rendering function that returns the HTML markup of the component based on its state and the component instance.

- `initialState`: The initial state of the component.

- `eventHandlings`: An array of event handling objects.

- `onEffect(state, component)`: An effect function to run when the state changes.

### `State(component, state$)`

A function to observe the state changes of a component.

**Arguments:**

- `component`: The component instance.

- `state$`: The observable state.

### `runEffects(component, state$)`

A function to run effects when the state changes.

**Arguments:**

- `component`: The component instance.

- `state$`: The observable state.

### `mountEvents(eventHandlings, state$, component)`

A function to mount event listeners based on event handlings.

**Arguments:**

- `eventHandlings`: An array of event handling objects.

- `state$`: The observable state.

- `component`: The component instance.

### `Router`

A class that provides routing functionality for single-page applications.

**Constructor:**

- `Router(routes, routerName)`: Creates a new `Router` instance.

**Methods:**

- `navigateTo(path)`: Navigates to the specified path.

- `setData(data)`: Sets data for the current route.

- `getRouterState()`: Returns an observable of the current router state.

For more details and examples, please refer to the [API Reference](#api-reference) section.

## Contributing

Contributions to the Reactive Web Components library are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request in the [GitHub repository](https://github.com/AndreyRomashko/reactive-web-components).

## License

Reactive Web Components is [MIT licensed](https://github.com/AndreyRomashko/reactive-web-components/blob/main/LICENSE).
