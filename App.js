import React from 'react';
import { View,Text, StatusBar } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { PlayerContext } from './PlayContext';
import { ModalPortal } from 'react-native-modals';


function App() {
  

  return (
   <PlayerContext>
   <AppNavigation />
   <ModalPortal />
   </PlayerContext>
  );
}


export default App;
