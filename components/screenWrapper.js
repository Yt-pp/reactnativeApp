import { View, Text, StatusBar, Platform } from 'react-native'
import React from 'react'

export default function ScreenWrapper({children}) {
    
    let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : Platform.OS === 'ios' ? 30 : 0;
    console.log('StatusBar.currentHeight:', StatusBar.currentHeight);
    console.log('statusBarHeight:', statusBarHeight);
  return (
    <>
    <StatusBar translucent backgroundColor="transparent"></StatusBar>
    <View style={{paddingTop: statusBarHeight}}>
        
      {
        children
      }
    </View>
    </>
  )
}