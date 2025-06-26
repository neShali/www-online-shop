import React, { useState } from 'react';
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
  IonSkeletonText,
  IonImg,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi } from '../services/api';
import { Product, Category } from '../types';

const SearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(),
  });

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products', { search: searchText, category: selectedCategory, page }],
    queryFn: () => productsApi.getProducts({
      search: searchText || undefined,
      category_id: selectedCategory ? parseInt(selectedCategory) : undefined,
      skip: (page - 1) * 10,
      limit: 10,
    }),
    enabled: searchText.length >= 2 || !!selectedCategory,
  });

  const handleSearch = (event: CustomEvent) => {
    setSearchText(event.detail.value);
    setPage(1);
  };

  const handleCategoryChange = (event: CustomEvent) => {
    setSelectedCategory(event.detail.value);
    setPage(1);
  };

  const loadMore = async (event: CustomEvent) => {
    if (products && page < products.pages) {
      setPage(prev => prev + 1);
      await refetch();
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="search-container">
          <IonSearchbar
            value={searchText}
            debounce={500}
            onIonInput={handleSearch}
            placeholder="Search products..."
          />

          <IonItem>
            <IonLabel>Category</IonLabel>
            <IonSelect
              value={selectedCategory}
              onIonChange={handleCategoryChange}
              placeholder="All Categories"
            >
              <IonSelectOption value="">All Categories</IonSelectOption>
              {categories?.map((category: Category) => (
                <IonSelectOption key={category.id} value={category.id}>
                  {category.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </div>

        {/* Search Results */}
        <div className="section-padding">
          {isLoading ? (
            <IonGrid>
              <IonRow>
                {[1, 2, 3, 4].map((i) => (
                  <IonCol size="6" key={i}>
                    <IonCard>
                      <IonSkeletonText animated style={{ height: '150px' }} />
                      <IonCardContent>
                        <IonSkeletonText animated style={{ width: '80%' }} />
                        <IonSkeletonText animated style={{ width: '60%' }} />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          ) : products && products.items.length > 0 ? (
            <>
              <IonGrid>
                <IonRow>
                  {products.items.map((product: Product) => (
                    <IonCol size="6" key={product.id}>
                      <IonCard>
                        {product.image_url && (
                          <IonImg src={product.image_url} alt={product.name} />
                        )}
                        <IonCardHeader>
                          <IonCardTitle>{product.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <p className="price">${product.price}</p>
                          <p className="description">{product.description}</p>
                          <IonButton fill="clear" size="small">
                            View Details
                          </IonButton>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
              <IonInfiniteScroll onIonInfinite={loadMore}>
                <IonInfiniteScrollContent loadingText="Loading more products...">
                </IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </>
          ) : (searchText.length >= 2 || selectedCategory) && (
            <div className="no-results">
              <p>No products found matching your search criteria.</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;