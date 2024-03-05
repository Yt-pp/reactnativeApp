

import React from 'react';
import { View,Text, StatusBar } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { PlayerContext } from './PlayContext';


function App() {
  

  return (
   <PlayerContext>
   <AppNavigation />
   </PlayerContext>
  );
}


export default App;
