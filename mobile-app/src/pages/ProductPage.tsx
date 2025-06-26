import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonBackButton,
  IonButtons,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonSkeletonText
} from '@ionic/react';
import { addOutline, removeOutline, cartOutline, starOutline, star } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useGetProduct } from '../hooks';
import { useAddItemToCart } from '../hooks';

interface ProductPageParams {
  productId: string;
}

const ProductPage: React.FC = () => {
  const { productId } = useParams<ProductPageParams>();
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch real product data
  const { 
    data: product, 
    isLoading, 
    error 
  } = useGetProduct(productId || '', { enabled: !!productId });

  const addToCartMutation = useAddItemToCart();

  // Set default variant when product loads
  React.useEffect(() => {
    if (product?.variants && product.variants.length > 0 && selectedVariant === null) {
      setSelectedVariant(product.variants[0].id);
    }
  }, [product, selectedVariant]);

  const currentVariant = product?.variants?.find(v => v.id === selectedVariant) || product?.variants?.[0];

  const handleVariantChange = (event: CustomEvent) => {
    setSelectedVariant(Number(event.detail.value));
    setQuantity(1); // Сброс количества при смене варианта
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    const maxStock = currentVariant?.stock || 999; // Default to 999 if no variant or no stock info
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/products" />
            </IonButtons>
            <IonTitle>Загрузка...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard>
              <IonSkeletonText animated style={{ height: '300px' }} />
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonSkeletonText animated style={{ width: '60%', height: '28px' }} />
              </IonCardHeader>
              <IonCardContent>
                <IonSkeletonText animated style={{ height: '20px' }} />
                <IonSkeletonText animated style={{ height: '20px', width: '80%' }} />
                <IonSkeletonText animated style={{ height: '32px', width: '40%' }} />
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Error state
  if (error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/products" />
            </IonButtons>
            <IonTitle>Ошибка</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard color="danger">
              <IonCardContent>
                <h2>Ошибка загрузки товара</h2>
                <p>{error.message}</p>
                <IonButton fill="clear" routerLink="/products">
                  Вернуться к каталогу
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Product not found
  if (!product) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/products" />
            </IonButtons>
            <IonTitle>Товар не найден</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard>
              <IonCardContent>
                <h2>Товар не найден</h2>
                <p>Товар с ID {productId} не найден.</p>
                <IonButton fill="clear" routerLink="/products">
                  Вернуться к каталогу
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const handleAddToCart = async () => {
    if (!product || !productId || !selectedVariant) {
      setToastMessage('Пожалуйста, выберите вариант товара');
      setShowToast(true);
      return;
    }
    
    try {
      await addToCartMutation.mutateAsync({
        product_id: Number(productId),
        variant_id: selectedVariant,
        quantity,
      });
      
      setToastMessage(`Добавлено в корзину: ${product.name || 'Товар'} (${quantity} шт.)`);
      setShowToast(true);
    } catch (error: unknown) {
      console.error('Add to cart error:', error);
      const errorMessage = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail || 'Ошибка при добавлении в корзину';
      setToastMessage(errorMessage);
      setShowToast(true);
    }
  };

  // Рейтинг (заглушка)
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <IonIcon
        key={i}
        icon={i < rating ? star : starOutline}
        style={{ color: '#ffd700', fontSize: '1.2rem' }}
      />
    ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/products" />
          </IonButtons>
          <IonTitle>{product.name || 'Товар'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '16px' }}>
          {/* Изображение товара */}
          <IonCard>
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name || ''} 
                style={{ 
                  width: '100%', 
                  height: '300px', 
                  objectFit: 'cover' 
                }} 
              />
            ) : (
              <div style={{ 
                height: '300px', 
                background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem'
              }}>
                📦
              </div>
            )}
          </IonCard>

          {/* Основная информация */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: '1.5rem' }}>
                {product.name || 'Без названия'}
              </IonCardTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {renderStars(4)} {/* Заглушка рейтинга */}
                </div>
                <span style={{ color: '#666' }}>(12 отзывов)</span>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                {product.description || 'Описание отсутствует'}
              </p>
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: 'var(--ion-color-primary)', fontSize: '2rem', margin: 0 }}>
                  ${currentVariant?.price || product.price || 0}
                </h3>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Выбор варианта */}
          {product.variants && product.variants.length > 0 ? (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Выберите вариант</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel>Размер и цвет</IonLabel>
                  <IonSelect
                    value={selectedVariant}
                    onIonChange={handleVariantChange}
                    interface="popover"
                  >
                    {product.variants.map((variant) => (
                      <IonSelectOption key={variant.id} value={variant.id}>
                        {variant.size || 'Один размер'} - {variant.color || 'Один цвет'} (${variant.price || product.price || 0})
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                
                {currentVariant && (
                  <div style={{ marginTop: '16px' }}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="6">
                          <IonLabel>
                            <h3>Размер: {currentVariant.size || 'Один размер'}</h3>
                          </IonLabel>
                        </IonCol>
                        <IonCol size="6">
                          <IonLabel>
                            <h3>Цвет: {currentVariant.color || 'Один цвет'}</h3>
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    
                    {currentVariant.stock && currentVariant.stock > 0 ? (
                      <IonBadge color="success" style={{ marginTop: '10px' }}>
                        В наличии: {currentVariant.stock} шт.
                      </IonBadge>
                    ) : (
                      <IonBadge color="danger" style={{ marginTop: '10px' }}>
                        Нет в наличии
                      </IonBadge>
                    )}
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          ) : null}

          {/* Количество и добавление в корзину */}
          {(selectedVariant && currentVariant && currentVariant.stock && currentVariant.stock > 0) && (
            <IonCard>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <IonLabel>
                    <h3>Количество:</h3>
                  </IonLabel>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IonButton
                      fill="outline"
                      size="small"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <IonIcon icon={removeOutline} />
                    </IonButton>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                      {quantity}
                    </span>
                    <IonButton
                      fill="outline"
                      size="small"
                      onClick={() => handleQuantityChange(1)}
                      disabled={currentVariant?.stock ? quantity >= currentVariant.stock : false}
                    >
                      <IonIcon icon={addOutline} />
                    </IonButton>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  size="large"
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending || !selectedVariant}
                >
                  <IonIcon icon={cartOutline} slot="start" />
                  {addToCartMutation.isPending ? 'Добавляем...' : 'Добавить в корзину'}
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}

          {/* Характеристики */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Характеристики</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>
                  <h3>Артикул</h3>
                  <p>{product.id}</p>
                </IonLabel>
              </IonItem>
              {product.category_id && (
                <IonItem>
                  <IonLabel>
                    <h3>Категория ID</h3>
                    <p>{product.category_id}</p>
                  </IonLabel>
                </IonItem>
              )}
              <IonItem>
                <IonLabel>
                  <h3>Доступные варианты</h3>
                  <p>{product.variants?.length || 0} вариантов</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>Статус</h3>
                  <p>{product.is_active ? 'Активен' : 'Неактивен'}</p>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;