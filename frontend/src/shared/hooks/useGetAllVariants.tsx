import { productsHooks } from '../api';

export const useGetAllVariants = () => {
  const { data } = productsHooks.useListProducts();

  const variants = data?.items.flatMap((product) => product.variants ?? []);

  const colors = variants?.reduce<{ color: string; color_hex?: string }[]>(
    (acc, curr) => {
      if (!acc.some((item) => item.color === curr.color)) {
        acc.push({
          color: curr.color,
          color_hex: curr.color_hex ?? undefined,
        });
      }
      return acc;
    },
    []
  );

  const sizes = [...new Set(variants?.map((item) => item.size))];

  const priceRange =
    data?.items
      .map((product) => product.price)
      .filter((price): price is number => typeof price === 'number') ?? [];

  return {
    sizes,
    colors,
    priceRange: {
      min: String(Math.min(...priceRange)),
      max: String(Math.max(...priceRange)),
    },
  };
};
