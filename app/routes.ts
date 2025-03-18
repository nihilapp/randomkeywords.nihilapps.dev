import {
  type RouteConfig, index, prefix,
  route
} from '@react-router/dev/routes';

export default [
  index('./pages/common/routes/Home.tsx'),
  route(
    '/categories',
    './pages/categories/routes/CategoryDetail.tsx'
  ),

  ...prefix('/cms/', [
    index('./pages/common/routes/CmsHome.tsx'),
    route(
      '/categories',
      './pages/categories/routes/CmsCategories.tsx'
    ),
    route(
      '/sub-categories',
      './pages/sub-categories/routes/CmsSubCategories.tsx'
    ),
    route(
      '/keywords',
      './pages/keywords/routes/CmsKeywords.tsx'
    ),
  ]),
] satisfies RouteConfig;
