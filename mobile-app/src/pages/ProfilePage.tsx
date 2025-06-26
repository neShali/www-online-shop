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
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonSkeletonText
} from '@ionic/react';
import { personOutline, settingsOutline, logOutOutline, heartOutline, mailOutline } from 'ionicons/icons';
import { useAuth } from '../providers/authProvider';
import { useHistory } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const history = useHistory();

  if (isLoading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard>
              <IonCardContent style={{ textAlign: 'center', padding: '40px 20px' }}>
                <IonSkeletonText animated style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 20px' }} />
                <IonSkeletonText animated style={{ width: '50%', height: '20px', margin: '0 auto 10px' }} />
                <IonSkeletonText animated style={{ width: '80%', height: '16px', margin: '0 auto' }} />
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!isLoggedIn) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '16px' }}>
            <IonCard>
              <IonCardContent style={{ textAlign: 'center', padding: '40px 20px' }}>
                <IonIcon icon={personOutline} style={{ fontSize: '4rem', color: '#ccc', marginBottom: '20px' }} />
                <h2>Guest</h2>
                <p>Sign in to access your personal account</p>
                <IonButton onClick={() => history.push('/auth')}>Sign In</IonButton>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardContent>
                <IonList>
                  <IonItem button>
                    <IonIcon icon={heartOutline} slot="start" />
                    <IonLabel>Favorites</IonLabel>
                  </IonItem>
                  <IonItem button>
                    <IonIcon icon={settingsOutline} slot="start" />
                    <IonLabel>Settings</IonLabel>
                  </IonItem>
                </IonList>
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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '16px' }}>
          <IonCard>
            <IonCardContent style={{ textAlign: 'center', padding: '40px 20px' }}>
              <IonAvatar style={{ width: '60px', height: '60px', margin: '0 auto 20px' }}>
                <IonIcon icon={personOutline} style={{ fontSize: '2rem', color: '#3880ff' }} />
              </IonAvatar>
              <h2>{user?.username || 'User'}</h2>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                <IonIcon icon={mailOutline} style={{ marginRight: '5px' }} />
                {user?.email}
              </p>
              {user?.is_superuser && (
                <div style={{ marginTop: '10px' }}>
                  <span style={{ 
                    background: '#3880ff', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem' 
                  }}>
                    Admin
                  </span>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonList>
                <IonItem button>
                  <IonIcon icon={heartOutline} slot="start" />
                  <IonLabel>Favorites</IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon icon={settingsOutline} slot="start" />
                  <IonLabel>Settings</IonLabel>
                </IonItem>
                <IonItem button onClick={logout}>
                  <IonIcon icon={logOutOutline} slot="start" />
                  <IonLabel>Sign Out</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;