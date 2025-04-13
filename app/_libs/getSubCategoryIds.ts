import { SubCategoriesQuery } from '@/_features';

export async function getSubCategoryIds() {
  const { items, } = await SubCategoriesQuery.getAll();

  return [
    { id: 'all', name: '전체', },
    ...items.map((subCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
    })),
  ];
}
