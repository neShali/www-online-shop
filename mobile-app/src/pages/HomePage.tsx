import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonSpinner,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useListActivePromos } from '../hooks';
import { useListProducts } from '../hooks';
import { useIsAuthenticated } from '../hooks';

const HomePage: React.FC = () => {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  
  // Fetch real data
  const { 
    data: promos, 
    isLoading: promosLoading, 
    error: promosError,
    refetch: refetchPromos 
  } = useListActivePromos();
  
  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError,
    refetch: refetchProducts 
  } = useListProducts({ limit: 4 }); // Get first 4 products for homepage

  const handleRefresh = async (event: CustomEvent) => {
    try {
      await Promise.all([
        refetchPromos(),
        refetchProducts()
      ]);
      setShowToast(true);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      event.detail.complete();
    }
  };

  const navigateToProducts = () => {
    history.push('/products');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Интернет-магазин</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Главная</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Промоакции */}
        <div className="section-padding">
          <h2>🔥 Актуальные акции</h2>
          {promosLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <IonSpinner />
            </div>
          ) : promosError ? (
            <IonCard color="warning">
              <IonCardContent>
                <p>Ошибка загрузки акций: {promosError.message}</p>
                <IonButton fill="clear" onClick={() => refetchPromos()}>
                  Повторить
                </IonButton>
              </IonCardContent>
            </IonCard>
          ) : !promos || promos.length === 0 ? (
            <IonCard>
              <IonCardContent>
                <p>Нет активных акций</p>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonGrid>
              <IonRow>
                {promos.map((promo) => {
                  const discountText = promo.discount_percent 
                    ? `${promo.discount_percent}%`
                    : promo.discount_amount 
                    ? `$${promo.discount_amount}`
                    : 'Скидка';
                  
                  const endDate = new Date(promo.end_date);
                  const isValidDate = !isNaN(endDate.getTime());
                  
                  return (
                    <IonCol size="12" key={promo.id}>
                      <IonCard color="primary">
                        <IonCardHeader>
                          <IonCardTitle style={{ color: 'white' }}>
                            Промокод {promo.code}
                          </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent style={{ color: 'white' }}>
                          <p>Код: <strong>{promo.code}</strong></p>
                          <p>
                            Скидка: <strong>{discountText}</strong>
                          </p>
                          {promo.min_purchase_amount && (
                            <p>Минимальная сумма: ${promo.min_purchase_amount}</p>
                          )}
                          {isValidDate && (
                            <p>До: {endDate.toLocaleDateString('ru-RU')}</p>
                          )}
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          )}
        </div>

        {/* Рекомендуемые товары */}
        <div className="section-padding">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2>⭐ Рекомендуемое</h2>
            <IonButton fill="clear" onClick={navigateToProducts}>
              Все товары
            </IonButton>
          </div>
          
          {productsLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <IonSpinner />
            </div>
          ) : productsError ? (
            <IonCard color="warning">
              <IonCardContent>
                <p>Ошибка загрузки товаров: {productsError.message}</p>
                <IonButton fill="clear" onClick={() => refetchProducts()}>
                  Повторить
                </IonButton>
              </IonCardContent>
            </IonCard>
          ) : !products || products.items.length === 0 ? (
            <IonCard>
              <IonCardContent>
                <p>Нет товаров</p>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonGrid>
              <IonRow>
                {products.items.map((product) => (
                  <IonCol size="6" key={product.id}>
                    <IonCard onClick={() => history.push(`/products/${product.id}`)}>
                      {product.image_url && (
                        <img src={product.image_url} alt={product.name || ''} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      )}
                      <IonCardHeader>
                        <IonCardTitle style={{ fontSize: '1rem' }}>
                          {product.name || 'Без названия'}
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <p className="price">${product.price || 0}</p>
                        <p className="description">{product.description || ''}</p>
                        <IonButton fill="clear" size="small">
                          Подробнее
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          )}
        </div>

        {/* Быстрые действия */}
        <div className="section-padding">
          <h2>🛍️ Быстрые действия</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonCard onClick={navigateToProducts}>
                  <IonCardContent style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
                    <h3>Каталог</h3>
                    <p>Найти товары</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard onClick={() => history.push('/cart')}>
                  <IonCardContent style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛒</div>
                    <h3>Корзина</h3>
                    <p>Мои покупки</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Информация о подключении к API */}
        <div className="section-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Статус приложения</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>
                  <h3>🌐 API подключение</h3>
                  <p>localhost:8000/api/v1</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>🔐 Статус авторизации</h3>
                  <p>{isAuthenticated ? 'Авторизован' : 'Не авторизован'}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h3>📱 Мобильное приложение</h3>
                  <p>Подключено к реальному API</p>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Данные обновлены!"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;