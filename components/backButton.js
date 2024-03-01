import { TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { useNavigation } from '@react-navigation/core'

export default function BackButton() {
    const navigation = useNavigation();
  return (
  
      <TouchableOpacity style={{ zIndex : 50}} onPress={()=> navigation.goBack()} className="flex justify-center items-center p-3 bg-white rounded-xl h-10 w-10 shadow">
        <ChevronLeftIcon stroke={150} color="black" size="23" />
      </TouchableOpacity>
    
  )
}