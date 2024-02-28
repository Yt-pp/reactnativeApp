import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import imageSequence from '../assets/images/image'
import EmptyList from '../components/emptyList'
import { useNavigation } from '@react-navigation/core'

const items = [
  {
    id: 1,
    name: "winter",
    team: "aespa",
  },
  {
    id: 2,
    name: "karina",
    team: "aespa",
    // Add other properties here
  },
  {
    id: 3,
    name: "giselle",
    team: "aespa",
    // Add other properties here
  },
  {
    id: 4,
    name: "ningning",
    team: "aespa",
    // Add other properties here
  },
];


export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper className="flex-1">
    <View className="flex-row justify-between item-center p-4">
    <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>First K-pop App</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('Login')} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
        <Text className={colors.heading}>LogOut</Text>
    </TouchableOpacity>
    </View>
    <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
      <Image source={require("../assets/images/Kpop.png")} className="w-60 h-60">

      </Image>
    </View>

    <View className="px-4 space-y-3">
      <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>Recent Added</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('AddKpop')} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Kpop</Text>
          </TouchableOpacity>
      </View>
          <View style={{height:430}}>
              <FlatList
                  data={items}
                  ListEmptyComponent={<EmptyList message={"You haven't recorded any kpop star yet"} />}
                  numColumns={2}
                  keyExtractor={item=> item.id}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{
                    justifyContent: 'space-between'
                  }}
                  className="mx-1"
                  renderItem={({item})=>{
                    return (
                      <TouchableOpacity className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                        <View>
                          <Image source={imageSequence(item.id)} style={{width:155}} className="h-40 mb-2"></Image>
                          <Text className={`${colors.heading} font-bold`}>{item.name}</Text>
                          <Text className={`${colors.heading} text-xs`}>{item.team}</Text>
                        </View>
                      </TouchableOpacity>

                    )
                  }}
              />
          </View>
      </View>
   </ScreenWrapper>
  )
}