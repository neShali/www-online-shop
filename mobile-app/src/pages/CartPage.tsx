import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonImg,
  IonBadge,
  IonSkeletonText,
  IonAlert,
  IonToast,
  IonSpinner,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';
import { cartOutline, addOutline, removeOutline, trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import { useGetMyCart, useUpdateCartItem, useRemoveCartItem, useClearCart } from '../hooks';
import { useGetProduct } from '../hooks';
import type { CartItem } from '../types';

// Component for individual cart item
const CartItemComponent: React.FC<{
  item: CartItem;
  onQuantityChange: (itemId: number, currentQuantity: number, change: number) => void;
  onRemove: (itemId: number) => void;
  isUpdating: boolean;
}> = ({ item, onQuantityChange, onRemove, isUpdating }) => {
  const { data: product } = useGetProduct(item.product_id);
  
  return (
    <IonItemSliding>
      <IonCard>
        <IonCardContent style={{ padding: '8px' }}>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg 
                src={product?.image_url || 'https://via.placeholder.com/100x100?text=Product'} 
                alt={product?.name || 'Product'} 
              />
            </IonThumbnail>
            <IonLabel>
              <h3>{product?.name || `Product #${item.product_id}`}</h3>
              <p>
                {item.variant_size && `Size: ${item.variant_size}`}
                {item.variant_color && ` • Color: ${item.variant_color}`}
              </p>
              <p>${item.unit_price.toFixed(2)} each</p>
              <p><strong>Subtotal: ${(item.quantity * item.unit_price).toFixed(2)}</strong></p>
            </IonLabel>
            <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IonButton 
                fill="clear" 
                size="small"
                onClick={() => onQuantityChange(item.id, item.quantity, -1)}
                disabled={isUpdating}
              >
                <IonIcon icon={removeOutline} />
              </IonButton>
              <IonBadge color="primary">{item.quantity}</IonBadge>
              <IonButton 
                fill="clear" 
                size="small"
                onClick={() => onQuantityChange(item.id, item.quantity, 1)}
                disabled={isUpdating}
              >
                <IonIcon icon={addOutline} />
              </IonButton>
            </div>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <IonItemOptions side="end">
        <IonItemOption 
          color="danger" 
          onClick={() => onRemove(item.id)}
          disabled={isUpdating}
        >
          <IonIcon icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

const CartPage: React.FC = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();
  const { data: cart, isLoading, isError, error } = useGetMyCart({ enabled: isLoggedIn });
  const updateItemMutation = useUpdateCartItem();
  const removeItemMutation = useRemoveCartItem();
  const clearCartMutation = useClearCart();
  const [showClearAlert, setShowClearAlert] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  // Calculate total from items (since backend total_price might not be returned properly)
  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + (item.quantity * item.unit_price), 0);
  };

  const handleQuantityChange = async (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      await handleRemoveItem(itemId);
      return;
    }
    
    try {
      await updateItemMutation.mutateAsync({ itemId, updates: { quantity: newQuantity } });
    } catch (_error) {
      setToastMessage('Failed to update quantity');
      setShowToast(true);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeItemMutation.mutateAsync(itemId);
      setToastMessage('Item removed from cart');
      setShowToast(true);
    } catch (_error) {
      setToastMessage('Failed to remove item');
      setShowToast(true);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartMutation.mutateAsync();
      setToastMessage('Cart cleared');
      setShowToast(true);
    } catch (_error) {
      setToastMessage('Failed to clear cart');
      setShowToast(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard>
              <IonCardContent style={{ textAlign: 'center', padding: '60px 20px' }}>
                <IonIcon icon={cartOutline} style={{ fontSize: '4rem', color: '#ccc', marginBottom: '20px' }} />
                <h2>Sign in to view cart</h2>
                <p>Please sign in to see your cart items</p>
                <IonButton onClick={() => history.push('/auth')}>
                  Sign In
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (isLoading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            {[...Array(3)].map((_, index) => (
              <IonCard key={index}>
                <IonCardContent>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <IonSkeletonText animated />
                    </IonThumbnail>
                    <IonLabel>
                      <IonSkeletonText animated style={{ width: '80%' }} />
                      <IonSkeletonText animated style={{ width: '60%' }} />
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (isError) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard>
              <IonCardContent style={{ textAlign: 'center', padding: '60px 20px' }}>
                <IonIcon icon={cartOutline} style={{ fontSize: '4rem', color: '#ff4444', marginBottom: '20px' }} />
                <h2>Error loading cart</h2>
                <p>{error?.message || 'Failed to load cart'}</p>
                <IonButton onClick={() => history.push('/products')}>
                  Continue Shopping
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard>
              <IonCardContent style={{ textAlign: 'center', padding: '60px 20px' }}>
                <IonIcon icon={cartOutline} style={{ fontSize: '4rem', color: '#ccc', marginBottom: '20px' }} />
                <h2>Cart is empty</h2>
                <p>Add products from the catalog</p>
                <IonButton onClick={() => history.push('/products')}>
                  Continue Shopping
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart ({cart.items.length})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '16px' }}>
          <IonList>
            {cart.items.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                isUpdating={updateItemMutation.isPending || removeItemMutation.isPending}
              />
            ))}
          </IonList>

          <IonCard>
            <IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>Total: ${calculateTotal().toFixed(2)}</h2>
                {updateItemMutation.isPending && <IonSpinner />}
              </div>
              <IonButton expand="block" color="primary" style={{ marginBottom: '8px' }}>
                Checkout
              </IonButton>
              <IonButton 
                expand="block" 
                fill="outline" 
                color="danger"
                onClick={() => setShowClearAlert(true)}
                disabled={clearCartMutation.isPending}
              >
                Clear Cart
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <IonAlert
          isOpen={showClearAlert}
          onDidDismiss={() => setShowClearAlert(false)}
          header="Clear Cart"
          message="Are you sure you want to remove all items from your cart?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Clear', role: 'destructive', handler: handleClearCart }
          ]}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default CartPage;