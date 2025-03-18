import { CommonLayout } from '~/layouts';
import type { Route } from './+types/CategoryDetail';
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

export const meta = ({ params, }: Route.MetaArgs) => {
  const { categoryId, } = params;

  return setMeta({
    data: {
      title: `카테고리`,
      url: `/categories/${categoryId}`,
    },
  });
};

export default function CategoryDetailPage({}: Route.ComponentProps) {
  return (
    <CommonLayout>
      <div>content</div>
    </CommonLayout>
  );
}
