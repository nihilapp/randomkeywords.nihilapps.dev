import {
  type RouteConfig, index, layout, prefix
} from '@react-router/dev/routes';

export default [
  // home
  layout('layouts/CommonLayout.tsx', [
    index('./pages/common/routes/home.tsx'),
  ]),

  // api
] satisfies RouteConfig;
