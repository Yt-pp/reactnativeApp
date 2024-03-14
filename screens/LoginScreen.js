import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/core'
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline'
import Animated, { FadeInDown, LightSpeedInLeft, SlideInDown, StretchInY, BounceInLeft } from 'react-native-reanimated';
import AuthContext from '../auth.user'
import { authorize } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginScreen() {
  const navigation = useNavigation();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      console.log("access token", accessToken);
      console.log("expiration date",expirationDate);
      console.log(isAuthenticated)
      if(accessToken && expirationDate){
        const currentTime = Date.now();
        console.log("current time",currentTime)
        if(currentTime < parseInt(expirationDate)){
          login();
        }else{
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
          logout();
        
        }
      }
    }
    checkTokenValidity();
  })
  async function authenticate () {
   
      const config = {
       
        clientId:"a96b92afc71b49f89ea3509afe0ee718",
        scopes: [
          "user-read-email",
          "user-library-read",
          "user-read-recently-played",
          "user-top-read",
          'user-read-private',
          "playlist-read-private",
          "playlist-read-collaborative",
          "playlist-modify-public"
        ],
        redirectUrl:"com.awesomeproject:/oauth",
        serviceConfiguration: {
          authorizationEndpoint: 'https://accounts.spotify.com/authorize',
          tokenEndpoint: 'https://my-token-service/api/token',
        },
      }
      const result = await authorize(config);
      console.log(result);
      if(result.accessToken){
        const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
        AsyncStorage.setItem("token",result.accessToken);
        AsyncStorage.setItem("expirationDate",expirationDate.toString());

        login();
        console.log(isAuthenticated)
      }
  }

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleLogin = () => {
    let emailErrorText = '';
    let passwordErrorText = '';
    const accessToken = 'BQAPGg-7jTvnd-NKRhLql2ubdIiM08CwwkyADVYVXaGcLWkpgWkKWfxiWPn2CKVIP_w226uVGv0F3xVPGLUV5sUjoS1wc-XBpwl6hTK928llSvVdZri3YJnjfb6c8CDBSpO1QbCHFsJ87KSTFp2n27hMRsmFXD5cyGftCLsVHWYaKd7wMbIaSszafuiDtEEJrg1LSPEHstLViQMtxzhsJhbnApZPuogUDpS2STZhexg4PPG61Ynzh765hR5Q5mjro7ms'
    const expirationDate = '1710314746000';
    AsyncStorage.setItem("token",accessToken);
    AsyncStorage.setItem("expirationDate",expirationDate.toString());

    // Validate email
    if (!email) {
      emailErrorText = 'Email is required';
    } else if (!isValidEmail(email)) {
      emailErrorText = 'Invalid email format';
    }
  
    // Validate password
    if (!password) {
      passwordErrorText = 'Password is required';
    } 
  
    // Set errors
    setEmailError(emailErrorText);
    setPasswordError(passwordErrorText);
  
    // If password is valid, proceed with login regardless of email
    if (emailErrorText === '' &&passwordErrorText === '') {
      // Reset input fields
      setEmail('');
      setPassword('');
      // Handle 
      login();
    }
  };
  

  const isValidEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  
  return (
    <ScrollView className="flex-1 bg-white" style={{backgroundColor:colors.theme}}>

   
    <SafeAreaView className="flex">
      <Animated.View entering={LightSpeedInLeft.delay(150).duration(1000)} className="flex-row justify-start mt-5">
          <TouchableOpacity onPress={()=> navigation.navigate('Welcome')} className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black"></ArrowLeftIcon>
          </TouchableOpacity>
      </Animated.View>
      <View className="flex-row justify-center">
        <Animated.Image entering={StretchInY.delay(600).duration(500).springify()} source={require('../assets/images/Login.png')}
        style={{width:200,height:200}}
        />

      </View>

    </SafeAreaView>
    <Animated.View entering={SlideInDown.delay(100).duration(500)} className="flex-1 bg-white px-8 pt-8"
    style={{borderTopLeftRadius:50,borderTopRightRadius:50}}
    >
      <View className="form space-y-2">
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
          <Text className="text-gray-700 ml-4">Email</Text>
          <TextInput
          value={email} 
          onChangeText={value=> setEmail(value)}
          placeholder='Enter Email'
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl">
          </TextInput>
          </Animated.View>
          {emailError !== '' && (
        <Animated.View entering={BounceInLeft.delay(10).duration(100).springify().damping(2)} style={{ flexDirection: 'row', alignItems: 'center' }} className="ml-4">
          <ExclamationTriangleIcon style={{ color: 'red'}}></ExclamationTriangleIcon>
          <Text style={{ color: 'red'}} className="ml-2">{emailError}</Text>
        </Animated.View>
      )}
        <View className="mb-3"></View>
     <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
          value={password} 
          onChangeText={value=> setPassword(value)}
          secureTextEntry
          placeholder='Enter Password'
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl">
          </TextInput>
          </Animated.View>
          {passwordError !== '' && (
          <Animated.View entering={BounceInLeft.delay(10).duration(100).springify().damping(2)} style={{ flexDirection: 'row', alignItems: 'center' }} className="ml-4">
          <ExclamationTriangleIcon style={{ color: 'red'}}></ExclamationTriangleIcon>
          <Text style={{ color: 'red'}} className="ml-2">{passwordError}</Text>
        </Animated.View>
      )}
       <Animated.View entering={FadeInDown.delay(650).duration(1000).springify()}>
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Forgot Password?</Text>
          </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(700).duration(1000).springify()}>
          <TouchableOpacity onPress={handleLogin} className="bg-yellow-400 rounded-2xl py-3">
            <Text className="font-xl text-center text-gray-700 font-bold">Login</Text>
          </TouchableOpacity>
          </Animated.View>
          <Animated.Text entering={FadeInDown.delay(800).duration(1000).springify()} className="flex text-center text-xl font-bold text-gray-700 py-5">
            Or
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(900).duration(1000).springify()} className="flex-row justify-center space-x-12 mb-7">
            <TouchableOpacity onPress={authenticate} className="p-2 bg-gray-100 rounded-2xl">
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
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="flex-row justify-center">
                <Text className="text-gray-700 font-semibold">
                    Don't Have an account?
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                    <Text className="font-semibold text-yellow-400"> Sign Up</Text>
                </TouchableOpacity>
            </Animated.View>
      </View>
    </Animated.View>
    </ScrollView>
  );
}