import React, { useState } from 'react';
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
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonToast,
  IonLoading,
} from '@ionic/react';
import { personOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import { useAuth } from '../providers/authProvider';
import { useHistory } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('danger');

  const { login, register } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (mode === 'register' && !username)) {
      setToastMessage('Please fill in all fields');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ username: email, password });
        setToastMessage('Login successful!');
        setToastColor('success');
        setShowToast(true);
        setTimeout(() => history.push('/home'), 1000);
      } else {
        await register({ username, email, password });
        setToastMessage('Registration successful! You are now logged in.');
        setToastColor('success');
        setShowToast(true);
        setTimeout(() => history.push('/home'), 1000);
      }
    } catch (error: unknown) {
      setToastMessage((error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Authentication failed');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Authentication</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '16px', maxWidth: '400px', margin: '0 auto' }}>
          <IonCard>
            <IonCardContent style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <IonIcon icon={personOutline} style={{ fontSize: '3rem', color: '#3880ff', marginBottom: '10px' }} />
                <h2>{mode === 'login' ? 'Sign In' : 'Sign Up'}</h2>
              </div>

              <IonSegment value={mode} onIonChange={(e) => setMode(e.detail.value as 'login' | 'register')}>
                <IonSegmentButton value="login">
                  <IonLabel>Login</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="register">
                  <IonLabel>Register</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                {mode === 'register' && (
                  <IonItem>
                    <IonIcon icon={personOutline} slot="start" />
                    <IonLabel position="stacked">Username</IonLabel>
                    <IonInput
                      type="text"
                      value={username}
                      onIonInput={(e) => setUsername(e.detail.value!)}
                      required
                      placeholder="Enter username"
                    />
                  </IonItem>
                )}

                <IonItem>
                  <IonIcon icon={mailOutline} slot="start" />
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonInput={(e) => setEmail(e.detail.value!)}
                    required
                    placeholder="Enter email"
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={lockClosedOutline} slot="start" />
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonInput={(e) => setPassword(e.detail.value!)}
                    required
                    placeholder="Enter password"
                  />
                </IonItem>

                <IonButton
                  expand="block"
                  type="submit"
                  disabled={loading}
                  style={{ marginTop: '20px' }}
                >
                  {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </IonButton>
              </form>

              {mode === 'login' && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>
                    Test credentials:<br />
                    admin@example.com / password<br />
                    user@example.com / password
                  </p>
                </div>
              )}
            </IonCardContent>
          </IonCard>
        </div>

        <IonLoading isOpen={loading} message="Please wait..." />
        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;