import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/core'
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline'

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleLogin = () => {
    let emailErrorText = '';
    let passwordErrorText = '';
  
    // Validate email
    if (!email) {
      emailErrorText = 'Email is required';
    } else if (!isValidEmail(email)) {
      emailErrorText = 'Invalid email format';
    }
  
    // Validate password
    if (!password) {
      passwordErrorText = 'Password is required';
    } else if (password.length < 6) {
      passwordErrorText = 'Password must be at least 6 characters long';
    }
  
    // Set errors
    setEmailError(emailErrorText);
    setPasswordError(passwordErrorText);
  
    // If password is valid, proceed with login regardless of email
    if (emailErrorText === '' &&passwordErrorText === '') {
      // Reset input fields
      setEmail('');
      setPassword('');
      // Handle login
      navigation.navigate('Home');
    }
  };
  

  const isValidEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        <Image source={require('../assets/images/Login.png')}
        style={{width:200,height:200}}
        >

        </Image>
      </View>

    </SafeAreaView>
    <View className="flex-1 bg-white px-8 pt-8"
    style={{borderTopLeftRadius:50,borderTopRightRadius:50}}
    >
      <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Email</Text>
          <TextInput
          value={email} 
          onChangeText={value=> setEmail(value)}
          placeholder='Enter Email'
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl">
          </TextInput>
         
          {emailError !== '' && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} className="ml-4 mb-3">
          <ExclamationTriangleIcon style={{ color: 'red'}}></ExclamationTriangleIcon>
          <Text style={{ color: 'red'}} className="ml-2">{emailError}</Text>
        </View>
      )}
     
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
          value={password} 
          onChangeText={value=> setPassword(value)}
          secureTextEntry
          placeholder='Enter Password'
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl">
          </TextInput>
          {passwordError !== '' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }} className="ml-4">
          <ExclamationTriangleIcon style={{ color: 'red'}}></ExclamationTriangleIcon>
          <Text style={{ color: 'red'}} className="ml-2">{passwordError}</Text>
        </View>
      )}
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} className="bg-yellow-400 rounded-2xl py-3">
            <Text className="font-xl text-center text-gray-700 font-bold">Login</Text>
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
                    Don't Have an account?
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                    <Text className="font-semibold text-yellow-400"> Sign Up</Text>
                </TouchableOpacity>
            </View>
      </View>
    </View>
    </View>
  );
}