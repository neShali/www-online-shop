import { cartHooks, productsHooks, reviewsHooks } from '../../shared/api';
import { ProductDetails } from '../../shared/components/productDetails';
import { ReviewForm } from '../../shared/components/reviewForm';
import { ReviewItem } from '../../shared/components/reviewItem';
import styles from './productPage.module.scss';
import { useParams } from 'react-router';

export function ProductPage() {
  const { productId } = useParams();

  const addItemToCart = cartHooks.useAddItemToCart();

  const { data: product } = productsHooks.useGetProductSuspense({
    product_id: Number(productId),
  });

  const { data: reviews } = reviewsHooks.useListProductReviewsSuspense({
    product_id: Number(productId),
  });

  reviewsHooks.useCreateReview();

  const handleAddToCart = (variant_id: number) => {
    if (!product || variant_id === undefined) return;
    addItemToCart.mutate({
      data: {
        product_id: product.id,
        variant_id,
        quantity: 1,
      },
    });
  };

  const { data } = cartHooks.useGetMyCart();
  console.log(data);

  return (
    <>
      <section className={styles.mainCard}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.gallery}>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt="Product"
                  className={styles.mainImg}
                />
              )}
            </div>
            <ProductDetails product={product} onAdd={handleAddToCart} />
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="container">
          <h2>Description | Reviews</h2>
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              name={'nn'}
              comment={review.comment}
              time={review.created_at}
              rating={review.rating}
            />
          ))}

          <ReviewForm />
        </div>
      </section>
    </>
  );
}
