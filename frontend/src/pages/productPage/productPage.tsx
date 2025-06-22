import { useCallback, useState } from 'react';
import { queryClient } from '../../queryClient';
import { cartHooks, productsHooks, reviewsHooks } from '../../shared/api';
import { ProductDetails } from '../../shared/components/productDetails';
import { ReviewForm } from '../../shared/components/reviewForm';
import { ReviewItem } from '../../shared/components/reviewItem';
import styles from './productPage.module.scss';
import { useParams } from 'react-router';
import { useAuth } from '../../providers/authProvider';

export function ProductPage() {
  const { productId } = useParams();
  const [reviewError, setReviewError] = useState('');

  const { isLoggedIn } = useAuth();

  const { mutate: addItemToCart } = cartHooks.useAddItemToCart({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: cartHooks.getMyCartQueryKey(),
        });
      },
      onError(err) {
        console.error('Add to cart failed', err);
      },
    },
  });

  const { data: product } = productsHooks.useGetProduct({
    product_id: Number(productId),
  });

  const {
    data: reviews = [],
    refetch: refetchReviews,
    isLoading: reviewsLoading,
  } = reviewsHooks.useListProductReviews({
    product_id: Number(productId),
  });

  const { mutate: addReview } = reviewsHooks.useCreateReview({
    mutation: {
      onSuccess() {
        refetchReviews();
      },
      onError(error) {
        const detail = error.response?.data.detail;
        if (Array.isArray(detail)) {
          setReviewError(detail.map((d) => d.msg || String(d)).join(', '));
        } else if (typeof detail === 'string') {
          setReviewError(detail);
        } else {
          setReviewError('An unknown error occurred.');
        }
      },
    },
  });

  const handleAddToCart = useCallback(
    (variant_id: number) => {
      if (!product || variant_id === undefined) return;
      addItemToCart({
        data: {
          product_id: product.id,
          variant_id,
          quantity: 1,
        },
      });
    },
    [addItemToCart, product]
  );

  const handleAddReview = useCallback(
    (text: string, rating: number) => {
      addReview({
        data: { product_id: Number(productId), comment: text, rating },
      });
    },
    [addReview, productId]
  );

  return (
    <>
      <section className={styles.mainCard}>
        <div className={styles.content}>
          {product?.image_url && (
            <img
              src={product.image_url}
              alt="Product"
              className={styles.mainImg}
            />
          )}
          <ProductDetails
            isLoggedIn={isLoggedIn}
            product={product}
            onAdd={handleAddToCart}
          />
        </div>
      </section>

      <section className={styles.reviews}>
        <h2 className={styles.reviewTitle}>Reviews</h2>
        {reviewsLoading && <p>Loading reviews…</p>}
        {!reviewsLoading &&
          reviews?.map((review) => (
            <ReviewItem
              key={review.id}
              name={review.user_id}
              comment={review.comment}
              time={review.created_at}
              rating={review.rating}
            />
          ))}

        <ReviewForm onSubmit={handleAddReview} error={reviewError} />
      </section>
    </>
  );
}
