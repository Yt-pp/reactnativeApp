import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useContext } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import imageSequence from '../assets/images/image'
import EmptyList from '../components/emptyList'
import { useNavigation } from '@react-navigation/core'
import LinearGradient from 'react-native-linear-gradient'
import ComponentTrack from '../components/componentTrack'
import MusicPlayerModal from '../components/MusicPlayerModal'
import { Player } from '../PlayContext'
import AuthContext from '../auth.user'

const items = [
  {
    id: 1,
    name: "winter",
    team: "aespa",
    stars: 5,
    desc: "Kim Min-jeong (Korean: 김민정; born January 1, 2001), known professionally as Winter, is a South Korean singer. She is a member of the South Korean girl group Aespa which debuted under SM Entertainment in November 2020. In January 2022, she became a member of the supergroup Got the Beat.",
  },
  {
    id: 2,
    name: "karina",
    team: "aespa",
    stars: 4,
    desc: "Yu Ji-min (Korean: 유지민; born April 11, 2000), known professionally as Karina, is a South Korean singer, rapper and dancer. She is the leader of the South Korean girl group Aespa, formed by SM Entertainment in November 2020. She is also a member of the supergroup Got the Beat, which debuted on January 3, 2022."
    // Add other properties here
  },
  {
    id: 3,
    name: "giselle",
    team: "aespa",
    stars: 4,
    desc: "Giselle (지젤) is a Japanese-Korean singer under SM Entertainment. She is a member of the girl group aespa.She debuted as a member of aespa on November 17, 2020 with the digital single 'Black Mamba'."
    // Add other properties here
  },
  {
    id: 4,
    name: "ningning",
    team: "aespa",
    stars: 4,
    desc:"Ningning (Korean: 닝닝; Chinese: 宁宁; Japanese: ニンニン) is a Chinese singer under SM Entertainment. She is the maknae of the girl group aespa."
    // Add other properties here
  },
];


export default function HomeScreen() {
  const { logout } = useContext(AuthContext);
  const { currentTrack, setCurrentTrack } = useContext(Player);
  const navigation = useNavigation();
  const handleLogout = () =>{
    navigation.navigate('Login');
    logout();
  }
  
  return (
    <LinearGradient className="flex-1" colors={['#aa4b6b', '#6b6b83', '#3b8d99']}>
    <ScreenWrapper>
    <View className="flex-row justify-between item-center p-4">
    <Text className={`${colors.heading} font-bold text-3xl shadow-sm text-white`}>First K-pop App</Text>
    <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
        <Text className={colors.heading}>LogOut</Text>
    </TouchableOpacity>
    </View>
    <TouchableOpacity>
    <View className="flex-row justify-center items-center bg-white rounded-xl mx-4 mb-4">
      <Image source={require("../assets/images/Kpop.png")} className="w-60 h-60">

      </Image>
    </View>
    </TouchableOpacity>
    <View className="px-4 space-y-3">
      <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl text-white`}>Recently Added</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('AddKpop')} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Kpop</Text>
          </TouchableOpacity>
      </View>
          <View style={{height:450}}>
              <FlatList
                  data={items}
                  ListEmptyComponent={<EmptyList message={"You haven't recorded any kpop star yet"} />}
                  numColumns={2}
                  keyExtractor={item=> item.id}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                  }}
                  contentContainerStyle={{ paddingBottom: currentTrack ? 150 : 80, }}
                  className="mx-1"
                  renderItem={({item})=>{
                    return (
                      <TouchableOpacity onPress={()=> {navigation.navigate('Detail', {...item})}} className="bg-white p-3 rounded-2xl mb-3 shadow-sm" style={{width:'48%'}}>
                        <View>
                          <Image source={imageSequence(item.id)} style={{width:'100%'}} className="h-40 mb-2"></Image>
                          <Text className={`${colors.heading} font-bold`}>{item.name}</Text>
                          <Text className={`${colors.heading} text-xs`}>{item.team}</Text>
                        </View>
                      </TouchableOpacity>

                    )
                  }}
              />
            
          </View>
          
      </View>
      
   <MusicPlayerModal/>
      
   </ScreenWrapper>
   
      <ComponentTrack />
   
   </LinearGradient>
  )
}