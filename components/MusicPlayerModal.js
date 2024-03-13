import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { BackwardIcon, ChevronDownIcon, ForwardIcon, PauseIcon } from 'react-native-heroicons/solid';
import { ArrowPathRoundedSquareIcon, EllipsisHorizontalIcon, StarIcon } from 'react-native-heroicons/outline';
import { Player } from '../PlayContext';
import { BottomModal} from "react-native-modals";
import { ModalContent } from "react-native-modals";
import Animated, { FadeIn, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

export default function MusicPlayerModal() {
    const { modalVisible, setModalVisible } = useContext(Player);
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const { currentAlbum, setCurrentAlbum } = useContext(Player);
    const {filled, setFilled} = useContext(Player);
    const selectAndPlay = async (song) => {
        setCurrentTrack(song);
    }
    const toggleIcon = () => {
        setFilled(!filled);
    };
  return (
    <BottomModal
                    visible={modalVisible}
                    onHardWareBackPress={() => setModalVisible(false)}
                    swipeDirection={["up", "down"]}
                    swipeThreshold={400}
                    onSwipeOut={(event) => {
                        setModalVisible(false)
                    }}
                    modalStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                >
                     <LinearGradient className="h-full w-full" colors={['#93A5CF', '#E4EfE9']}>
                    <ModalContent>
                       
                        <View className="px-4">
                            <TouchableOpacity onPress={()=>{setModalVisible(false)}} className="flex justify-center items-center my-6">
                                <ChevronDownIcon color="black"></ChevronDownIcon>
                            </TouchableOpacity>
                            <ScrollView className="space-y-3" entering={FadeOutDown.delay(600).duration(1000).springify()}>
                                <View className="flex-row w-full">
                                    <View className="flex-row items-center gap-3">
                                        {/* <Image source={currentAlbum?.image} style={{ width: 80, height: 80 }} className="rounded-lg" /> */}
                                        <Image source={{uri:currentTrack?.track.album.images[0].url}} style={{ width: 80, height: 80 }} className="rounded-lg" />
                                        <View>
                                            <Text numberOfLines={1} className="font-bold text-lg text-gray-950">
                                                {currentTrack?.track.name}
                                            </Text>
                                            <Text className=" text-gray-950 mb-3" style={{ marginTop: -2 }}>
                                                {currentTrack?.track.album.artists[0].name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="flex-row justify-center items-center space-x-2 ml-auto">
                                        <StarIcon color="black"></StarIcon>
                                        <EllipsisHorizontalIcon color="black"></EllipsisHorizontalIcon>
                                    </View>
                                </View>
                                <View className="flex-row w-full">
                                    <View className="flex-row gap-3">

                                        <View>
                                            <Text numberOfLines={1} className="font-bold text-lg text-gray-950">
                                                Playing Next
                                            </Text>
                                            {filled ? (
                                                <Animated.Text entering={FadeIn.delay(100).duration(200)} className=" text-gray-950 mb-3">
                                                From {currentAlbum?.album}
                                            </Animated.Text>
                                            ) : (
                                                <Text className=" text-gray-950 mb-3">
                                                
                                            </Text>
                                            )}
                                            
                                        </View>
                                    </View>
                                    <View className="flex-row justify-center items-center space-x-2 ml-auto">
                                        <TouchableOpacity onPress={toggleIcon}>
                                            {filled ? (
                                               <View style={{borderRadius:10}} className="bg-white p-2">
                                               <ArrowPathRoundedSquareIcon color="black"/>
                                               </View>
                                            ) : (
                                                 <View style={{borderRadius:10}} className="p-2">
                                                 <ArrowPathRoundedSquareIcon color="black" />
                                                 </View>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                 
                                </View>
                                <View style={{height:330}}>
                                {filled == true && (
                                    
                                <Animated.ScrollView 
                                showsHorizontalScrollIndicator={false}
                    
                                >
                                    {
                        currentAlbum?.songs.map((song, index) => {
                            
                            if (song.id > currentTrack?.id) {
                                return (
                                
                                    <Pressable key={index} onPress={()=>{selectAndPlay(song)}}>
                                        <Animated.View entering={FadeInDown.delay(100).duration(100*index).springify()} key={index} className="flex-row items-center gap-3 mb-2">
                                        <Image source={currentAlbum?.image} style={{ width: 55, height: 55 }} className="rounded-lg" />
                                        <View className="">
                                            <Text className="font-semibold text-lg text-gray-950">
                                                {song.name}
                                            </Text>
                                            <Text className="font-semibold text-base text-gray-950" >
                                                {currentAlbum?.singer}
                                            </Text>
                                        </View>
                                    </Animated.View>
                                    </Pressable>
                                );
                            } else {
                                return null; // Skip rendering songs that come before the current track
                            }
                        })
                    }
                                    </Animated.ScrollView>
                                   
                                    )}
                                     </View>
                            </ScrollView>
                        <View style={{height:10}} className="bg-gray-300 w-full mt-6 rounded-lg opacity-90">
                            <View style={{width:'30%',borderTopLeftRadius:30,borderBottomLeftRadius:30}} className="bg-gray-100 h-full"></View>
                        </View>
                        <View className="flex-row justify-between mt-3">
                        <Text>0:00</Text>
                        <Text>0:40</Text>
                        </View>
                        </View>
                        <View className="flex-row items-center justify-between mt-6 mx-14">
                            <TouchableOpacity>
                            <BackwardIcon size="40" color="black"></BackwardIcon>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <PauseIcon size="50" strokeWidth={3} stroke={220} color="black"></PauseIcon>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <ForwardIcon size="40" color="black"></ForwardIcon>
                            </TouchableOpacity>
                        </View>

                    </ModalContent>
                    </LinearGradient>
                </BottomModal>
  )
}