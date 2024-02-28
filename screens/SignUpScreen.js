import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/core'


export default function SignUpScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignUp = ()=>{
      if(username && email && password){
        // Clear the input fields
        setUsername('');
        setEmail('');
        setPassword('');
        //handle login
        navigation.navigate('Home')
        
      }else{
        //handle error
      }
  }
 
  return (
    <View className="flex-1 bg-white" style={{backgroundColor:colors.theme}}>

   
    <SafeAreaView className="flex">
      <View className="flex-row justify-start mt-5">
          <TouchableOpacity onPress={()=> navigation.goBack()} className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black"></ArrowLeftIcon>
          </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <Image source={require('../assets/images/signUp.png')}
        style={{width:200,height:200}}
        >

        </Image>
      </View>

    </SafeAreaView>
    <View className="flex-1 bg-white px-8 pt-8"
    style={{borderTopLeftRadius:50,borderTopRightRadius:50}}
    >
      <View className="form space-y-2">
      <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
          value={username} 
          onChangeText={value=> setUsername(value)}
          placeholder='Enter Name'
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3">
          </TextInput>
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
          value={email} 
          onChangeText={value=> setEmail(value)}
          placeholder='Enter Email'
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3">
          </TextInput>
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
          value={password} 
          onChangeText={value=> setPassword(value)}
          secureTextEntry
          placeholder='Enter Password'
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl">
          </TextInput>
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp} className="bg-yellow-400 rounded-2xl py-3">
            <Text className="font-xl text-center text-gray-700 font-bold">Sign Up</Text>
          </TouchableOpacity>
          <Text className="flex text-center text-xl font-bold text-gray-700 py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12 mb-7">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require("../assets/images/googleIcon.png")}
            className="w-10 h-10">
            </Image>
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require("../assets/images/appleIcon.png")}
            className="w-10 h-10">
            </Image>
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require("../assets/images/facebookIcon.png")}
            className="w-10 h-10">
            </Image>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
                <Text className="text-gray-700 font-semibold">
                    Already Have an account?
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text className="font-semibold text-yellow-400"> Login</Text>
                </TouchableOpacity>
            </View>
      </View>
    </View>
    </View>
  )
}