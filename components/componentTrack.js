import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { ForwardIcon, PauseIcon, PlayIcon } from 'react-native-heroicons/solid';
import { Player } from '../PlayContext';
import Sound from 'react-native-sound';

export default function ComponentTrack() {
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const { currentAlbum, setCurrentAlbum } = useContext(Player);
    const { modalVisible, setModalVisible, setScale } = useContext(Player);
    const { isPlaying,handlePausePlay } = useContext(Player);
   
  return (     
    <>
     <View style={{bottom:80}} className="absolute left-0 right-0">
    {currentTrack && (
        <TouchableOpacity onPress={() => { setModalVisible(true);setScale(0.95) }}>
            <View style={{ width: '90%' }} className="bg-gray-100 mx-auto rounded-2xl fixed p-2 flex flex-row items-center justify-between bottom-3 shadow-2xl mt-6">
                <View className="flex-row justify-start items-center gap-1">
                    {/* <Image source={currentAlbum?.image} style={{ width: 50, height: 50 }} className="rounded-lg" /> */}
                    <Image source={{uri:currentTrack?.track?.album?.images[0].url}} style={{ width: 50, height: 50 }} className="rounded-lg" />
                    <Text numberOfLines={1} className="font-bold text-lg text-gray-950" style={{width:'70%'}}>
                        {currentTrack?.track?.name}
                    </Text>
                </View>
                <View className="flex-row gap-2 ml-auto">
                    <TouchableOpacity onPress={()=>{handlePausePlay();}}>
                     {/* Render PlayIcon if not playing, otherwise render PauseIcon */}
                     {isPlaying ? (
                                    <PauseIcon color="black" strokeWidth={2} stroke={200} size="30" />
                                ) : (
                                    <PlayIcon color="black" strokeWidth={2} stroke={200} size="30" />
                                )}
                    </TouchableOpacity>
                    <ForwardIcon color="black" size="30" />
                </View>
            </View>
        </TouchableOpacity>
    )}
    </View>
</>

  )
}