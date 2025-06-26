import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { checkmarkCircle, closeCircle, time } from 'ionicons/icons';
import { useQuery } from '@tanstack/react-query';
import { productsApi, promosApi, categoriesApi } from '../services/api';

const ApiStatus: React.FC = () => {
  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products-test'],
    queryFn: () => productsApi.getProducts({ limit: 1 }),
    retry: 1,
  });

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories-test'],
    queryFn: () => categoriesApi.getCategories(),
    retry: 1,
  });

  const { data: promos, isLoading: promosLoading, error: promosError } = useQuery({
    queryKey: ['promos-test'],
    queryFn: () => promosApi.getActivePromos(),
    retry: 1,
  });

  const getStatusIcon = (loading: boolean, error: unknown, _data: unknown) => {
    if (loading) return time;
    if (error) return closeCircle;
    return checkmarkCircle;
  };

  const getStatusColor = (loading: boolean, error: unknown, _data: unknown) => {
    if (loading) return 'warning';
    if (error) return 'danger';
    return 'success';
  };

  const getStatusText = (loading: boolean, error: unknown, _data: unknown) => {
    if (loading) return 'Testing...';
    if (error) return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return 'Connected ✓';
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>API Connection Status</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IonIcon 
              icon={getStatusIcon(productsLoading, productsError, products)} 
              color={getStatusColor(productsLoading, productsError, products)}
            />
            <span>Products API: {getStatusText(productsLoading, productsError, products)}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IonIcon 
              icon={getStatusIcon(categoriesLoading, categoriesError, categories)} 
              color={getStatusColor(categoriesLoading, categoriesError, categories)}
            />
            <span>Categories API: {getStatusText(categoriesLoading, categoriesError, categories)}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IonIcon 
              icon={getStatusIcon(promosLoading, promosError, promos)} 
              color={getStatusColor(promosLoading, promosError, promos)}
            />
            <span>Promos API: {getStatusText(promosLoading, promosError, promos)}</span>
          </div>
          
          <div style={{ marginTop: '16px', padding: '8px', background: '#f5f5f5', borderRadius: '4px', fontSize: '0.9em' }}>
            <strong>API Base URL:</strong> http://localhost:8000/api/v1
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ApiStatus;