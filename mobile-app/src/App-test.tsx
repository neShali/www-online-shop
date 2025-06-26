import React from 'react';
import { IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Test App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Hello World! This is a test.</h1>
        <p>If you can see this, the basic setup is working.</p>
      </IonContent>
    </IonPage>
  </IonApp>
);

export default App;