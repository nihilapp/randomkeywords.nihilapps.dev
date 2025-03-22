import { CmsLayout } from '~/layouts';
import type { Route } from './+types/CmsSubCategories';
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
    title: `서브 카테고리 관리`,
    url: `/cms/sub-categories`,
  });
};

export default function CmsSubCategoriesPage({}: Route.ComponentProps) {
  return (
    <CmsLayout>
      <div>content</div>
    </CmsLayout>
  );
}
