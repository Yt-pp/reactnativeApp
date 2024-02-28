import { View, Text, Image } from 'react-native'
import React from 'react'

export default function EmptyList({message}) {
  return (
    <View className="flex justify-center items-center my-5 space-y-3">
      <Image className="w-40 h-40 shadow" source={require("../assets/images/emptyList.jpg")}></Image>
      <Text className="font-bold text-gray-600" >{message||'data not found'}</Text>
    </View>
  )
}