import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/core'
import Animated, { FadeInDown, FadeInUp, FlipInEasyX, FlipInEasyY, LightSpeedInLeft, SlideInDown, StretchInY } from 'react-native-reanimated';
export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor:colors.theme}}>
            <View className="flex-1 flex justify-around my-4">
                <Animated.Text entering={FadeInUp.delay(200).duration(500).springify()} className="text-white font-bold text-4xl text-center">
                    Let's Get Started! 
                </Animated.Text>
                <View className="flex-row justify-center">
                <Animated.Image entering={FlipInEasyY.delay(100).duration(500).springify().mass(2)
} style={{width:350,height:350}} source={require("../assets/images/Welcome.png")}>

                </Animated.Image>
            </View>
            <View className="space-y-4">
                <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()}>
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} className="bg-yellow-400 py-3 mx-7 rounded-xl">
                        <Text className="text-center font-bold text-lg text-gray-700">
                            Sign Up
                        </Text>
                </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()} className="flex-row justify-center">
                <Text className="text-white font-semibold">
                    Already Have an account?
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text className="font-semibold text-yellow-400"> Log in</Text>
                </TouchableOpacity>
            </Animated.View>
            </View>
           
            </View>
           
    </SafeAreaView>
  )
}