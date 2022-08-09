import * as React from 'react';
import { Route, Routes, RouteProps } from 'react-router-dom';
import { IRoute, RouteComponent, RouteComponentPromise } from './IRoute';


function LazyloadLoadingComponent() {
  return <div>Loading</div>
}

export class RoutesService {
  // 渲染路由
  static renderRoutes(routes: IRoute[]) {
    const RoutesArr = routes.map(route => {
      const ReactNode = RoutesService.render(route);
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<ReactNode/>}
        />
      );
    });

    return <Routes>{RoutesArr}</Routes>
  }



  // 路由守卫
  static render(route: IRoute) {
    return (props: RouteProps) => {
      let TargetComponent = route.component as RouteComponent;
        if (route.lazyload) {
          TargetComponent = React.lazy(route.component as RouteComponentPromise);
          return (
            <React.Suspense fallback={<LazyloadLoadingComponent />}>
              <TargetComponent {...props} />
            </React.Suspense>
          );
        }
        return <TargetComponent {...props} />;
    };
  }
}
