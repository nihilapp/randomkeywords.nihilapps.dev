import {
  type RouteConfig, index, layout, prefix,
  route
} from '@react-router/dev/routes';

export default [
  // home
  layout('layouts/CommonLayout.tsx', [
    index('./pages/common/routes/home.tsx'),
    route('/categories', './pages/categories/routes/CategoryDetail.tsx'),
    // /categories
    // /sub-categories/:subCategoryId/keywords
  ]),

  // api
] satisfies RouteConfig;
