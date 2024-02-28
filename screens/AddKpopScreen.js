import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/core'

export default function AddKpopScreen() {
        const [team, setTeam] = useState('');
        const [name, setName] = useState('');

        const navigation = useNavigation();

        const handleAddKpop = ()=>{
            if(team && name){
                //Add Function
                navigation.navigate('Home');
            }else{
                //handle error
            }
        }
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View className="relative mt-5">
            <View className="absolute top-0 left-0">
            <BackButton></BackButton>
            </View>
            <Text className={`${colors.heading} font-bold text-xl text-center`}>Add Kpop</Text>
            <View className="flex-row justify-center my-3 mt-5">
                <Image source={require("../assets/images/addThings.jpg")} className="h-72 w-72 "></Image>
            </View>
            <View className="space-y-2 mx-2">
                <Text className={`${colors.heading} font-bold text-lg`}>Which Team?</Text>
                <TextInput value={team} onChangeText={value=> setTeam(value)} className="p-4 bg-white rounded-full mb-3"></TextInput>
                <Text className={`${colors.heading} font-bold text-lg`}>What is the Member Name? </Text>
                <TextInput value={name} onChangeText={value=> setName(value)} className="p-4 bg-white rounded-full mb-3"></TextInput>
            </View>
        </View>
        <View>
            <TouchableOpacity onPress={handleAddKpop} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 mx-3 shadow-sm">
            <Text className="text-center text-white text-lg font-bold">Add Kpop</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}