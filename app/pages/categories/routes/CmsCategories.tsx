import type { Route } from './+types/CmsCategories';
import { setMeta } from '~/utils';

export const loader = (
  async ({ request, }: Route.LoaderArgs) => {
    return {};
  }
);

export const action = (
  async ({ request, }: Route.ActionArgs) => {
    return {};
  }
);

export const meta = ({}: Route.MetaArgs) => {
  return setMeta({
    data: {
      title: `카테고리 관리`,
      url: `/cms/categories`,
    },
  });
};

export default function CmsCategoriesPage({}: Route.ComponentProps) {
  return (
    <div>cms categories</div>
  );
}
