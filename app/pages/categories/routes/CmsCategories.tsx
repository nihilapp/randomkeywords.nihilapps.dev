import { CmsLayout } from '~/layouts';
import type { Route } from './+types/CmsCategories';
import { setMeta } from '~/utils';
import { getCategories } from '../queries';
import { CategoryList } from '../components';
import { ExpandBlock } from '~/pages/common/components/ExpandBlock';

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
      <ExpandBlock
        title='카테고리 목록'
      >
        <CategoryList
          categories={loaderData.categories}
        />
      </ExpandBlock>

      <ExpandBlock
        title='닫힌 블록'
        defaultOpen={false}
      >
        <div>
          <input type='text' />
        </div>
      </ExpandBlock>
    </CmsLayout>
  );
}
