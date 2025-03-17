import {
  type RouteConfig, index, layout, prefix,
  route
} from '@react-router/dev/routes';

export default [
  // home
  layout('layouts/CommonLayout.tsx', [
    index('./pages/common/routes/Home.tsx'),
    route('/categories', './pages/categories/routes/CategoryDetail.tsx'),
    // /categories
    // /sub-categories/:subCategoryId/keywords
  ]),

  layout('layouts/CmsLayout.tsx', [
    ...prefix('/cms', [
      index('./pages/common/routes/CmsHome.tsx'),
      route('/categories', './pages/categories/routes/CmsCategories.tsx'),
    ]),
  ]),

  // api
] satisfies RouteConfig;
