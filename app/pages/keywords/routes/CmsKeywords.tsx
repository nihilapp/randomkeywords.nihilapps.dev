import { CmsLayout } from '~/layouts';
import type { Route } from './+types/CmsKeywords';
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
      title: `키워드 관리`,
      url: `/cms/keywords`,
    },
  });
};

export default function CmsKeywordsPage({}: Route.ComponentProps) {
  return (
    <CmsLayout>
      <div>content</div>
    </CmsLayout>
  );
}
