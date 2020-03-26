import React from 'react';
import { IonSpinner } from '@ionic/react';

const Loading = () => {
  return (
    <div className="spinner">
      <IonSpinner color="danger" name="crescent" />
    </div>
  );
};

export default Loading;
