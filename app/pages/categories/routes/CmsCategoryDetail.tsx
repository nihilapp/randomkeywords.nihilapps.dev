import { createId } from '@paralleldrive/cuid2';
import { getCategory } from '~/pages/categories/queries';
import type { Route } from './+types/CmsCategoryDetail';
import { CmsLayout } from '~/layouts';
import { setMeta } from '~/utils';

export const loader = async ({ params, }: Route.LoaderArgs) => {
  const category = await getCategory(params.categoryId);

  return {
    category,
  };
};

export const action = (
  async ({ request, }: Route.ActionArgs) => {
    return {};
  }
);

export const meta = (
  ({ data, }: Route.MetaArgs) => {
    const { category, } = data;

    return setMeta({
      title: `[${category.name}] 카테고리`,
      url: `/cms/categories/${category.id}`,
    });
  }
);

export default function CmsCategoryDetailPage({ loaderData, }: Route.ComponentProps) {
  const { category, } = loaderData;

  return (
    <CmsLayout>
      <div>{JSON.stringify(category, null, 2)}</div>
    </CmsLayout>
  );
}
