import { CmsLayout } from '~/layouts';
import type { Route } from './+types/CmsCategories';
import { setMeta } from '~/utils';
import { getCategories } from '../queries';
import { CategoryList } from '../components';

export const loader = (
  async ({ request, }: Route.LoaderArgs) => {
    const { data: categories, } = await getCategories();

    return {
      categories,
    };
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

export default function CmsCategoriesPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <CmsLayout>
      <CategoryList
        categories={loaderData.categories}
      />
    </CmsLayout>
  );
}
