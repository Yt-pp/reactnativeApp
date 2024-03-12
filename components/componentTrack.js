import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useContext, useEffect } from 'react';
import { ForwardIcon, PauseIcon } from 'react-native-heroicons/solid';
import { Player } from '../PlayContext';

export default function ComponentTrack() {
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const { currentAlbum, setCurrentAlbum } = useContext(Player);
    const { modalVisible, setModalVisible } = useContext(Player);


  return (    
    <>
     <View className="absolute bottom-14 left-0 right-0">
    {currentTrack && (
        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
            <View style={{ width: '90%' }} className="bg-gray-100 mx-auto rounded-2xl fixed p-2 flex flex-row items-center justify-between bottom-3 shadow-2xl mt-6">
                <View className="flex-row justify-center items-center gap-3">
                    <Image source={currentAlbum?.image} style={{ width: 50, height: 50 }} className="rounded-lg" />
                    <Text numberOfLines={1} className="font-bold text-lg text-gray-950">
                        {currentTrack?.name}
                    </Text>
                </View>
                <View className="flex-row gap-2 mr-3">
                    <PauseIcon color="black" strokeWidth={2} stroke={200} size="30" />
                    <ForwardIcon color="black" size="30" />
                </View>
            </View>
        </TouchableOpacity>
    )}
    </View>
</>

  )
}