import {
  type RouteConfig, index, layout, prefix
} from '@react-router/dev/routes';

export default [
  // home
  layout('layouts/common/CommonLayout.tsx', [
    index('routes/home.tsx'),
  ]),

  // api
  ...prefix('api', [ index('routes/api/index.tsx'), ]),
] satisfies RouteConfig;
