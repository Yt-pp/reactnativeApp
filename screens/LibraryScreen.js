import { View, Text, ScrollView, FlatList, TouchableOpacity,Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from '../components/emptyList';
import { colors } from '../theme';
import { Player } from '../PlayContext';
import ComponentTrack from '../components/componentTrack';

export default function LibraryScreen() {
  const[recentlyPlayed,setRecentlyPlayed]=useState([]);
  const { currentTrack, setCurrentTrack } = useContext(Player);


  const getRecentPlayed = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try{
        const response = await axios({
          method: "GET",
          url:"https://api.spotify.com/v1/me/player/recently-played?limit=10",
          headers:{
                Authorization: `Bearer ${accessToken}`
            },
          params:{
                limit:10
            }
        })
        const data = await response.data.items;
        setRecentlyPlayed(data);
        console.log(recentlyPlayed)
    
    }catch(error){
        console.log(error.message)
    }
};


console.log(recentlyPlayed)
useEffect(()=>{
  getRecentPlayed();
},[])

  return (
    <View className="flex-1 bg-white">
    <ScreenWrapper>
      
    <View className="w-full flex justify-center items-center mt-3">
      <Text className="text-lg">Library</Text>
    </View>
    
      <Text className="text-2xl mx-6">Recently Played</Text>
      <View style={{height:700}}>
      <FlatList
                  data={recentlyPlayed}
                  ListEmptyComponent={<EmptyList message={"You haven't recorded any kpop star yet"} />}
                  numColumns={2}
                  keyExtractor={item=> item.track.album.id}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                  }}
                  contentContainerStyle={{ paddingBottom: 80, }}
                  className="mx-3"
                  renderItem={({item})=>{
                    return (
                      <TouchableOpacity onPress={()=> {setCurrentTrack([]),setCurrentTrack(item)}} className="p-3" style={{width:'49%'}}>
                        <View>
                          <Image source={{uri:item.track.album.images[0].url}} style={{width:'100%'}} className="h-40 mb-0 rounded-2xl"></Image>
                          <View className="space-y-0">
                          <Text numberOfLines={1} className={`${colors.heading} text-lg`}>{item.track.name}</Text>
                          <Text className={`${colors.heading} text-sm`}>{item.track.album.artists[0].name}</Text>
                          </View> 
                        </View>
                      </TouchableOpacity>

                    )
                  }}
              />

</View>
<ComponentTrack/>
    </ScreenWrapper>
    </View>
  
  )
}