import { MdFolder, MdLocalOffer, MdOutlineFolder } from 'react-icons/md';
import { getCategories } from '~/pages/categories/queries';
import type { Route } from './+types/CmsHome';
import { setMeta } from '~/utils';
import { getSubCategories } from '~/pages/sub-categories/queries';
import { getKeywords } from '~/pages/keywords/queries';
import { StatCard } from '~/pages/common/components';
import { CmsLayout } from '~/layouts';

export const loader = (
  async ({ request, }: Route.LoaderArgs) => {
    const { data: categories, } = await getCategories();
    const { data: subCategories, } = await getSubCategories();
    const { data: keywords, } = await getKeywords();

    return {
      categories,
      subCategories,
      keywords,
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
      title: `CMS 홈`,
      url: `/cms`,
    },
  });
};

export default function CmsHomePage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <CmsLayout>
      <div className='flex flex-col mo-md:flex-row gap-2'>
        <StatCard
          icon={MdFolder}
          title='카테고리'
          count={loaderData.categories.length}
          variant='blue'
        />
        <StatCard
          icon={MdOutlineFolder}
          title='서브카테고리'
          count={loaderData.subCategories.length}
          variant='red'
        />
        <StatCard
          icon={MdLocalOffer}
          title='키워드'
          count={loaderData.keywords.length}
          variant='green'
        />
      </div>
    </CmsLayout>
  );
}
