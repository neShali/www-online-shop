import type { ProductCreate } from '../../api/types/ProductCreate';

type ProductCardProps = {
  product: ProductCreate;
  onAddToCart: (productId: number) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <a href={``} className="shop__catalog__item">
      <div className="shop__catalog__card">
        <img
          src={product.image_url ?? '/placeholder.png'}
          alt={product.name ?? 'Product'}
          style={{ width: '100%', height: 'auto' }}
        />
        <button
          className="shop__catalog__btn"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(0);
          }}
        >
          <svg width="12" height="12">
            <use xlinkHref="symbol-defs.svg#icon-plus" />
          </svg>
        </button>
      </div>
      <p className="shop__catalog__tag">{product.name ?? 'Unnamed product'}</p>
      <div className="shop__catalog__desc">
        <p>{product.description ?? ''}</p>
        <span>${product.price?.toFixed(2) ?? '—'}</span>
      </div>
    </a>
  );
};