import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { HeartIcon } from 'react-native-heroicons/outline'

export default function HeartButton() {
  return (
    <TouchableOpacity style={{ zIndex : 50}} className="flex justify-center items-center p-3 bg-white rounded-xl h-10 w-10 shadow">
        <HeartIcon stroke={150} color="black" size="23" />
      </TouchableOpacity>
  )
}