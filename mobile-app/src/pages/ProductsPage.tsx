import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonSpinner,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useListProducts } from '../hooks';
import { useListCategories } from '../hooks';
import type { ProductListParams } from '../hooks';
import type { Product } from '../types';

const ProductsPage: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  // Build query parameters
  const queryParams: ProductListParams = {
    skip: currentPage * 20,
    limit: 20,
    search: searchText || undefined,
    category_id: selectedCategory,
  };

  // Fetch real data
  const { 
    data: productsResponse, 
    isLoading: productsLoading, 
    error: productsError,
    refetch: refetchProducts 
  } = useListProducts(queryParams);

  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useListCategories();

  // Update products list when new data comes in
  useEffect(() => {
    if (productsResponse) {
      if (currentPage === 0) {
        setAllProducts(productsResponse.items);
      } else {
        setAllProducts(prev => [...prev, ...productsResponse.items]);
      }
    }
  }, [productsResponse, currentPage]);

  // Reset products when search/filter changes
  useEffect(() => {
    setCurrentPage(0);
    setAllProducts([]);
  }, [searchText, selectedCategory]);

  const handleSearch = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };

  const handleCategoryChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setSelectedCategory(value === '' ? undefined : Number(value));
  };

  const handleRefresh = async (event: CustomEvent) => {
    try {
      setCurrentPage(0);
      setAllProducts([]);
      await refetchProducts();
      setShowToast(true);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      event.detail.complete();
    }
  };

  const loadMoreProducts = async (event: CustomEvent) => {
    if (productsResponse && allProducts.length < productsResponse.total) {
      setCurrentPage(prev => prev + 1);
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  const navigateToProduct = (productId: number) => {
    history.push(`/products/${productId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Каталог товаров</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Каталог</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Поиск и фильтры */}
        <div className="search-container">
          <IonSearchbar
            value={searchText}
            debounce={1000}
            onIonInput={handleSearch}
            placeholder="Поиск товаров..."
          />

          <IonItem>
            <IonLabel>Категория</IonLabel>
            <IonSelect
              value={selectedCategory || ''}
              onIonChange={handleCategoryChange}
              placeholder="Все категории"
              interface="popover"
            >
              <IonSelectOption value="">Все категории</IonSelectOption>
              {categoriesLoading ? (
                <IonSelectOption value="" disabled>Загрузка...</IonSelectOption>
              ) : categoriesError ? (
                <IonSelectOption value="" disabled>Ошибка загрузки</IonSelectOption>
              ) : (
                categories?.map((category) => (
                  <IonSelectOption key={category.id} value={category.id}>
                    {category.name}
                  </IonSelectOption>
                ))
              )}
            </IonSelect>
          </IonItem>
        </div>

        {/* Результаты поиска */}
        <div className="section-padding">
          <div style={{ marginBottom: '16px', color: '#666' }}>
            {productsLoading && currentPage === 0 ? (
              'Загрузка...'
            ) : productsError ? (
              `Ошибка: ${productsError.message}`
            ) : (
              `Найдено товаров: ${productsResponse?.total || 0}`
            )}
          </div>
          
          {productsLoading && currentPage === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <IonSpinner />
            </div>
          ) : productsError ? (
            <div className="error-state" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚠️</div>
              <h3>Ошибка загрузки</h3>
              <p>{productsError.message}</p>
              <IonButton fill="clear" onClick={() => refetchProducts()}>
                Повторить
              </IonButton>
            </div>
          ) : allProducts.length > 0 ? (
            <>
              <IonGrid>
                <IonRow>
                  {allProducts.map((product) => (
                    <IonCol size="6" key={product.id}>
                      <IonCard onClick={() => navigateToProduct(product.id)}>
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name || ''} 
                            style={{ 
                              width: '100%', 
                              height: '150px', 
                              objectFit: 'cover' 
                            }} 
                          />
                        ) : (
                          <div style={{ 
                            height: '150px', 
                            background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem'
                          }}>
                            📦
                          </div>
                        )}
                        <IonCardHeader>
                          <IonCardTitle style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>
                            {product.name || 'Без названия'}
                          </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <p className="price" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--ion-color-primary)' }}>
                            ${product.price || 0}
                          </p>
                          <p className="description" style={{ 
                            fontSize: '0.8rem', 
                            color: '#666', 
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {product.description || 'Описание отсутствует'}
                          </p>
                          <IonButton fill="clear" size="small">
                            Подробнее
                          </IonButton>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
              
              <IonInfiniteScroll
                onIonInfinite={loadMoreProducts}
                threshold="100px"
                disabled={!productsResponse || allProducts.length >= productsResponse.total}
              >
                <IonInfiniteScrollContent
                  loadingSpinner="bubbles"
                  loadingText="Загрузка ещё..."
                ></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </>
          ) : (
            <div className="no-results" style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
              <h3>Товары не найдены</h3>
              <p>Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Каталог обновлен!"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;