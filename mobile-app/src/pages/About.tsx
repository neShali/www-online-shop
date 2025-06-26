import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonActionSheet,
  IonToast
} from '@ionic/react';
import { arrowBack, shareOutline, moon, sunny } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

const About: React.FC = () => {
  const history = useHistory();
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleShare = (platform: string) => {
    setToastMessage(`Поделиться в ${platform}`);
    setShowToast(true);
    setShowActionSheet(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
    setToastMessage(`Тема изменена на ${!isDarkMode ? 'тёмную' : 'светлую'}`);
    setShowToast(true);
  };

  return (
    <IonPage>
      <Header title="О приложении" showAboutButton={false} />
      <IonContent>
        <div style={{ padding: '16px' }}>
          <IonButton
            fill="clear"
            onClick={() => history.goBack()}
            style={{ marginBottom: '16px' }}
          >
            <IonIcon icon={arrowBack} slot="start" />
            Назад
          </IonButton>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Мобильное приложение</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Это мобильное приложение создано с использованием Ionic React.
                Приложение демонстрирует адаптацию веб-проекта под мобильную платформу.
              </p>
              
              <h3>Функции приложения:</h3>
              <IonList>
                <IonItem>
                  <IonLabel>📱 Адаптивный дизайн</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>🌐 Интеграция с внешним API</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>🔄 Обновление свайпом</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>🔍 Поиск по контенту</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>📄 Модальные окна</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>🎨 Смена темы</IonLabel>
                </IonItem>
              </IonList>

              <div style={{ marginTop: '20px' }}>
                <IonButton
                  expand="block"
                  onClick={() => setShowActionSheet(true)}
                  style={{ marginBottom: '10px' }}
                >
                  <IonIcon icon={shareOutline} slot="start" />
                  Поделиться приложением
                </IonButton>

                <IonButton
                  expand="block"
                  fill="outline"
                  onClick={toggleTheme}
                >
                  <IonIcon icon={isDarkMode ? sunny : moon} slot="start" />
                  {isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Технологии</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h3>Ionic React</h3>
                    <p>Фреймворк для мобильных приложений</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>TypeScript</h3>
                    <p>Типизированный JavaScript</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>JSONPlaceholder API</h3>
                    <p>Тестовый API для данных</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Action Sheet для поделиться */}
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Telegram',
              handler: () => handleShare('Telegram')
            },
            {
              text: 'WhatsApp',
              handler: () => handleShare('WhatsApp')
            },
            {
              text: 'VK',
              handler: () => handleShare('VK')
            },
            {
              text: 'Отмена',
              role: 'cancel'
            }
          ]}
        />

        {/* Toast уведомления */}
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

export default About;