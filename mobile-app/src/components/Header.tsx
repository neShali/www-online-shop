import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { informationCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showAboutButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showAboutButton = true }) => {
  const history = useHistory();

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {showAboutButton && (
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => history.push('/about')}
          >
            <IonIcon icon={informationCircle} />
          </IonButton>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;