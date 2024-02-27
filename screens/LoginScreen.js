import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'

export default function LoginScreen() {
  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between item-center p-4">
      <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>First App</Text>
      <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className={colors.heading}>LogOut</Text>
      </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4">
        <Image source={require("../assets/images/winter.jpg")} className="w-60 h-60">

        </Image>
      </View>
    </ScreenWrapper>
  )
}