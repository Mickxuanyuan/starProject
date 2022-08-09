import { ComponentType } from 'react';
import { RouteProps} from 'react-router-dom';

export type RouteComponent = ComponentType<RouteProps>
export type RouteComponentPromise = () => Promise<{default: any} | any>

export type IRoute = RouteProps & {
  component: RouteComponentPromise | RouteComponent;
  lazyload?:boolean;
}
