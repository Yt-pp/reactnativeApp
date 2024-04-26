import React from 'react';
import { View,Text, StatusBar } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { PlayerContext } from './PlayContext';
import { ModalPortal } from 'react-native-modals';
import { AuthProvider } from './auth.user';


function App() {
  

  return (

    <AuthProvider>
   <PlayerContext>
   <AppNavigation />
   <ModalPortal />
   </PlayerContext>
   </AuthProvider>
   
  );
}


export default App;
