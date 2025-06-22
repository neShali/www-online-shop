import { Collection } from '../../shared/components/collection';
import { promosHooks, type GetProductQueryResponse } from '../../shared/api';
import { useQueries } from '@tanstack/react-query';
import { getProduct } from '../../shared/api/generated/hooks/productsHooks/useGetProduct';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export function HomePage() {
  const navigate = useNavigate();

  const { data: newPromo } = promosHooks.useGetPromoProducts({ promo_id: 1 });
  const { data: weekPromo } = promosHooks.useGetPromoProducts({ promo_id: 2 });

  const useProductsByPromo = (promoList?: { product_id: number }[]) =>
    useQueries({
      queries:
        promoList?.map((p) => ({
          queryKey: ['product', p.product_id] as const,
          queryFn: () =>
            getProduct({
              product_id: p.product_id,
            }) as Promise<GetProductQueryResponse>,
        })) ?? [],
    });

  const newProductQueries = useProductsByPromo(newPromo);
  const weekProductQueries = useProductsByPromo(weekPromo);

  const newProducts = newProductQueries
    .map((q) => q.data)
    .filter((p): p is GetProductQueryResponse => Boolean(p))
    .slice(0, 4);

  const weekProducts = weekProductQueries
    .map((q) => q.data)
    .filter((p): p is GetProductQueryResponse => Boolean(p))
    .slice(0, 4);

  const moreButtonClickHandler = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  return (
    <section>
      <Collection
        onClick={moreButtonClickHandler}
        products={newProducts}
        title={'new collection summer 2025'}
      />
      <Collection
        onClick={moreButtonClickHandler}
        products={weekProducts}
        title={'new this week'}
      />
    </section>
  );
}
