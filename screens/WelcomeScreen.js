import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/core'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor:colors.theme}}>
            <View className="flex-1 flex justify-around my-4">
                <Text className="text-white font-bold text-4xl text-center">
                    Let's Get Started! 
                </Text>
                <View className="flex-row justify-center">
                <Image style={{width:350,height:350}} source={require("../assets/images/Welcome.png")}>

                </Image>
            </View>
            <View className="space-y-4">
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} className="bg-yellow-400 py-3 mx-7 rounded-xl">
                        <Text className="text-center font-bold text-lg text-gray-700">
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                <Text className="text-white font-semibold">
                    Already Have an account?
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text className="font-semibold text-yellow-400"> Log in</Text>
                </TouchableOpacity>
            </View>
            </View>
           
            </View>
           
    </SafeAreaView>
  )
}