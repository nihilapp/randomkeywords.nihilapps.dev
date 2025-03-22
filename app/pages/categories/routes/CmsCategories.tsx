import { CmsLayout } from '~/layouts';
import type { Route } from './+types/CmsCategories';
import { setMeta } from '~/utils';
import { getCategories } from '../queries';
import { CategoryList, NewCategoryForm } from '../components';
import { ExpandBlock } from '~/pages/common/components';

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
    if (request.method === 'POST') {
      const formData = await request.formData();
      const name = formData.get('name');
      const order = formData.get('order');

      console.log(name, order);
    }
    return {};
  }
);

export const meta = ({}: Route.MetaArgs) => {
  return setMeta({
    title: `카테고리 관리`,
    url: `/cms/categories`,
  });
};

export default function CmsCategoriesPage({
  loaderData,
}: Route.ComponentProps) {
  const { categories, } = loaderData;

  return (
    <CmsLayout>
      <ExpandBlock
        title='카테고리 목록'
      >
        <CategoryList
          categories={categories}
        />
      </ExpandBlock>

      <ExpandBlock
        title='카테고리 생성'
        defaultOpen={false}
      >
        <NewCategoryForm count={categories.length} />
      </ExpandBlock>
    </CmsLayout>
  );
}
