import { BehaviorSubject, Observable } from "rxjs";
import { ReactiveComponent, registerComponent } from "../components";

type Route = {
  path: string;
  component: typeof ReactiveComponent;
};

type RouterState = {
  router: {
    path: string;
    data: any;
  };
};

export class Router {
  private routes: Route[];
  private routerState$: BehaviorSubject<RouterState>;
  private routerName: string = "router-outlet";
  constructor(routes: Route[], routerName: string) {
    this.routes = routes;
    if (routerName) {
      this.routerName = routerName;
    }
    registerComponent(routerName, ReactiveComponent);
    this.routerState$ = new BehaviorSubject<RouterState>({
      router: { path: "/", data: null },
    });
    this.registerRouteChangeHandler();
  }

  private registerRouteChangeHandler() {
    window.addEventListener("popstate", () => {
      this.handleRouteChange(window.location.pathname);
    });
    this.handleRouteChange(window.location.pathname);
  }

  private handleRouteChange(pathname: string) {
    const route = this.routes.find((r) => r.path === pathname);
    if (route) {
      const outlet = document.querySelector(this.routerName);
      if (outlet) {
        while (outlet.firstChild) {
          outlet.firstChild.remove();
        }
        const component = new route.component();
        outlet.appendChild(component);
        component.routerState$ = this.routerState$;
        component.setRouterState = this.setData.bind(this);
        component.navigate = this.navigateTo.bind(this);
      }
    }
  }

  public navigateTo(path: string) {
    window.history.pushState(null, "", path);
    this.handleRouteChange(path);
  }

  public setData(data: any) {
    const currentState = this.routerState$.value;
    this.routerState$.next({
      ...currentState,
      router: { path: currentState.router.path, data },
    });
  }

  public getRouterState(): Observable<RouterState> {
    return this.routerState$.asObservable();
  }
}
