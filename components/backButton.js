import { TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { useNavigation } from '@react-navigation/core'

export default function BackButton() {
    const navigation = useNavigation();
  return (
  
      <TouchableOpacity style={{ zIndex : 50}} onPress={()=> navigation.goBack()} className="bg-white rounded-full h-8 w-8">
        <ChevronLeftIcon color="black" size="30" />

      </TouchableOpacity>
    
  )
}