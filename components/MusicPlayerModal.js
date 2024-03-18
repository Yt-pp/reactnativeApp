import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { BackwardIcon, ChevronDownIcon, ForwardIcon, PauseIcon, PlayIcon } from 'react-native-heroicons/solid';
import { ArrowPathRoundedSquareIcon, EllipsisHorizontalIcon, StarIcon } from 'react-native-heroicons/outline';
import { Player } from '../PlayContext';
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import Animated, { FadeIn, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Easing } from 'react-native-reanimated';
import debounce from 'lodash/debounce';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MusicPlayerModal() {
    const { modalVisible, setModalVisible } = useContext(Player);
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const { currentSound, isPlaying, handlePausePlay } = useContext(Player);
    const { currentAlbum, setCurrentAlbum, currentTime, setCurrentTime, widthPercentage, setWidthPercentage } = useContext(Player);
    const { filled, setFilled ,play} = useContext(Player);
    const scrollViewRef = useRef(null);
    const { scale, setScale } = useContext(Player); // State variable for controlling the scale of modal content
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Check if scrollViewRef.current is not null before calling scrollTo
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ x: 0, animated: true });
            }
        }, 5000); // Repeat every 5 seconds

        return () => clearInterval(intervalId); // Clear interval on unmount
    }, []);


    const selectAndPlay = async (song) => {
        const accessToken = await AsyncStorage.getItem("token");
        try {
            const response = await axios({
                method: "GET",
                url: `https://api.spotify.com/v1/tracks/${song.id}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });
            const data = await response.data;
            setCurrentTrack({ track: data });
            play({ track: data }); // Play the track and set the sound
            

        } catch (error) {
            console.log("error of get details: ", error.message);
        }
       
        //setCurrentTrack(song);
        //play(song); // Play the track and set the sound
    }

    const toggleIcon = () => {
        setFilled(!filled);
    };


    const formatDuration = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const test = Dimensions.get("screen").height
    // Function to handle swiping
    const handleSwiping = debounce((event) => {
        // const { axis: { y } } = event;
        
        // let newScale;
       
        // if (y <= (test/2)&& scale>=0.9) {
        //     newScale = Math.min(1.0, 1.0 - (y / 4000));
        // } else if(y >=(test/2)&& scale<=1.0) {
        //     newScale = Math.max(0.95, 0.95 + (y / 4000));
        // }

        
        //     setScale(newScale);
        
   
    }, 16); // Adjust debounce delay for smoother animation


    // Find the index of the current track in the current album
    const currentIndex = currentAlbum?.tracks?.items.findIndex(song => song.id === currentTrack?.track?.id);


    return (
        <BottomModal
            visible={modalVisible}
            onHardWareBackPress={() => setModalVisible(false)}
            swipeDirection={["up", "down"]}
            onSwipeOut={() => setModalVisible(false)}
            onSwiping={handleSwiping}
            onSwipeRelease={() => setScale(1)} // Reset scale to 1 when swipe is released
            onSwipingOut={() => {
                setScale(1);
                setModalVisible(false);
            }}
            modalStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
            <LinearGradient className="h-full w-full" colors={['#93A5CF', '#E4EfE9']}>
                <ModalContent>

                    <View className="px-4">
                        <TouchableOpacity onPress={() => { setModalVisible(false); setScale(1); }} className="flex justify-center items-center my-6">
                            <ChevronDownIcon color="black"></ChevronDownIcon>
                        </TouchableOpacity>
                        <ScrollView className="space-y-3" entering={FadeOutDown.delay(600).duration(1000).springify()}>

                            <View className="flex-row items-center" style={{ width: '100%' }}>
                                <View>
                                    <Image source={{ uri: currentTrack?.track?.album?.images[0].url }} style={{ width: 80, height: 80 }} className="rounded-lg" />
                                </View>
                                <View className="flex-row mx-3" style={{ flex: 1 }} >
                                    <View style={{ height: 'auto' }}>
                                        <ScrollView
                                            ref={scrollViewRef}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            onContentSizeChange={() => {
                                                // Scroll to the start when content size changes
                                                scrollViewRef.current.scrollTo({ x: 0, animated: false });
                                            }}
                                        >
                                            <View>
                                                <Text numberOfLines={1} className="font-bold text-lg text-gray-950">
                                                    {currentTrack?.track?.name}
                                                </Text>
                                            </View>
                                        </ScrollView>
                                        <Text className="text-gray-950 mb-3" style={{ marginTop: -2 }}>
                                            {currentTrack?.track?.album?.artists[0].name}
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center space-x-2 ml-auto">
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
                                                From {currentAlbum?.name}
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
                                            <View style={{ borderRadius: 10 }} className="bg-white p-2">
                                                <ArrowPathRoundedSquareIcon color="black" />
                                            </View>
                                        ) : (
                                            <View style={{ borderRadius: 10 }} className="p-2">
                                                <ArrowPathRoundedSquareIcon color="black" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ height: 330 }}>
                                {filled == true && (

                                    <Animated.ScrollView
                                        showsHorizontalScrollIndicator={false}

                                    >
                                        {currentAlbum?.tracks?.items
                                            ?.slice(currentIndex+1)
                                            .map((song, index) => {
                                                return (
                                                    <Pressable key={index} onPress={() => { selectAndPlay(song) }}>
                                                        <Animated.View entering={FadeInDown.delay(100).duration(100 * index).springify()} key={index} className="flex-row items-center gap-3 mb-2">
                                                            <Image source={{uri:currentAlbum?.images[0].url}} style={{ width: 55, height: 55 }} className="rounded-lg" />
                                                            <View className="">
                                                                <Text className="font-semibold text-lg text-gray-950">
                                                                    {song.name}
                                                                </Text>
                                                                <Text className="font-semibold text-base text-gray-950" >
                                                                    {currentAlbum?.artists[0].name}
                                                                </Text>
                                                            </View>
                                                        </Animated.View>
                                                    </Pressable>
                                                );
                                            })
                                        }
                                    </Animated.ScrollView>

                                )}
                            </View>
                        </ScrollView>
                        <View style={{ height: 10 }} className="bg-gray-300 w-full mt-6 rounded-lg opacity-90">
                            {currentSound ? <View style={{ width: `${Math.ceil(widthPercentage)}%`, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }} className="bg-gray-100 h-full"></View> : <View />}
                        </View>
                        <View className="flex-row justify-between mt-3">
                            <Text>{currentSound ? formatDuration(currentTime) : 'Loading...'}</Text>
                            <Text>{currentSound ? formatDuration(currentSound.getDuration()) : 'Loading...'}</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between mt-6 mx-14">
                        <TouchableOpacity>
                            <BackwardIcon size="40" color="black"></BackwardIcon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handlePausePlay(); }}>
                            {isPlaying ? (
                                <PauseIcon color="black" strokeWidth={2} stroke={200} size="40" />
                            ) : (
                                <PlayIcon color="black" strokeWidth={2} stroke={200} size="40" />
                            )}
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