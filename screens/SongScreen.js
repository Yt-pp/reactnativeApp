import { View, Text, TextInput, TouchableOpacity, Keyboard, Image, Modal, Pressable, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { EllipsisHorizontalIcon, MagnifyingGlassIcon, XCircleIcon } from 'react-native-heroicons/solid'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, FadeIn, FadeOut, withTiming, runOnJS } from 'react-native-reanimated'
import ScreenWrapper from '../components/screenWrapper'
import ComponentTrack from '../components/componentTrack'
import AsyncStorage from '@react-native-async-storage/async-storage'

const categories = [
    { name: "Example1", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example2", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example3", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example4", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example1", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example2", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example3", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example4", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example1", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example2", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example3", image: require('../assets/images/LE-SSERAFIM.jpg') },
    { name: "Example4", image: require('../assets/images/LE-SSERAFIM.jpg') },


]
const searchHistories = [
    { name: "Example 1", image: require('../assets/images/LE-SSERAFIM.jpg'), artists: "LE-SSERAFIM" },
    { name: "Example 2", image: require('../assets/images/LE-SSERAFIM.jpg'), artists: "LE-SSERAFIM" },
    { name: "Example 3", image: require('../assets/images/LE-SSERAFIM.jpg'), artists: "LE-SSERAFIM" },
    { name: "Example 4", image: require('../assets/images/LE-SSERAFIM.jpg'), artists: "LE-SSERAFIM" },
]



export default function SongScreen() {
    const [indexToAnimate, setIndexToAnimate] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [userProfile,setUserProfile] = useState([]);

const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    console.log(accessToken)
    try{
        const response = await fetch("https://api.spotify.com/v1/me",{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await response.json();
        setUserProfile(data);
        return data;
    }catch(error){
        console.log(error.message)
    }
};

useEffect(() => {
    getProfile();
},[])


    // Animated value to control the scale of the item on long press
    const scale = useSharedValue(1);

    // Function to handle long press
    const onLongPress = (index) => {
        setIndexToAnimate(index);
        // Apply scale effect with timing animation
        scale.value = withTiming(1.05, { duration: 10 }, () => {
            // Callback function invoked when animation completes
            runOnJS(setModalVisible)(true);
        });

    };

    // Function to handle end of long press
    const onLongPressEnd = () => {
        // Restore scale to normal
        scale.value = withTiming(1.03, { duration: 10 });
    };

    const handleModalClose = () => {

        setModalVisible(false);
        // Restore scale to normal
        scale.value = withTiming(1, { duration: 100 }, () => {
            // Callback function invoked when animation completes
            runOnJS(setIndexToAnimate)(null);
        });
    }

    // Animated style for scale
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });


    const handleCancelPress = () => {
        setIsFocused(false);
        Keyboard.dismiss(); // Dismiss the keyboard
    };

    const handleDeleteInput = () => {
        setTextInputValue('');
    };

    return (
        <>
            <View className="bg-white flex-1">
            <StatusBar barStyle="dark-content"></StatusBar>
                <ScreenWrapper>
                    <View className="px-6">
                    {!isFocused && (<View className="flex-row items-center justify-between mt-4">
                        <Text className="text-4xl text-black font-bold">Search Song</Text>
                        
                            {userProfile?.images ?(<Image style={{ width: 40, height: 40 }} className="bg-gray-400 rounded-full" source={{uri:userProfile?.images[0].url}}></Image>):
                            (<View
                                style={{ width: 40, height: 40 }}
                                className="bg-gray-400 rounded-full">
                                     </View>)
                            }
                       
                    </View>)}
                    <View className="flex-row items-center mt-3">
                        <View
                            style={{
                                width: isFocused ? '80%' : '100%',
                            }}
                            className="px-2 flex-row items-center bg-gray-200 rounded-lg">
                            <TouchableOpacity>
                                <MagnifyingGlassIcon color="gray" />
                            </TouchableOpacity>
                            <TextInput
                                value={textInputValue}
                                onFocus={() => setIsFocused(true)}
                                placeholder='Artists, Songs, Lyrics and More'
                                className="p-2 px-2">
                            </TextInput>
                            {textInputValue.length > 0 && (
                                <TouchableOpacity className="ml-auto" onPress={handleDeleteInput}>
                                    <XCircleIcon color="gray" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {isFocused && (
                            <TouchableOpacity onPress={handleCancelPress}>
                                <Text className="text-lg text-black ml-4">Cancel</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    </View>
                        {isFocused ? (
                            <>
                                <View className="flex-row justify-between mt-3 mx-6">
                                    <Text className="text-black font-semibold">Recently Searched</Text>
                                    <TouchableOpacity>
                                        <Text>Clear</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="mt-3 border-t border-gray-100 ml-6" />
                                {searchHistories.length > 0 ? (
                                    <Animated.ScrollView 
                                    entering={FadeIn.delay(50).duration(100)} 
                                    exiting={FadeOut.delay(50).duration(100)} 
                                    contentContainerStyle={{
                                        paddingBottom:180
                                    }}
                                    className="bg-white bottom-0">
                                        {searchHistories.map((history, index) => (
                                            <Pressable key={index} onLongPress={() => onLongPress(index)} onPressOut={onLongPressEnd} onPress={() => console.log(index)}>
                                                <Animated.View style={[{ width: '100%' }, indexToAnimate === index ? animatedStyle : null]} className="flex-row items-center w-100 py-3 px-6">
                                                    <Image style={{ width: 70, height: 70 }} source={history.image} className="rounded-lg" />
                                                    <View className="space-y-0 ml-3">
                                                        <Text className="text-black text-lg">{history.name}</Text>
                                                        <Text className="text-base">Song - {history.artists}</Text>
                                                    </View>
                                                    <View className="ml-auto">
                                                        <EllipsisHorizontalIcon color="black" />
                                                    </View>
                                                </Animated.View>
                                                {indexToAnimate === index && (
                                                    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleModalClose}>
                                                        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center', paddingTop: '20%' }}>
                                                            <View style={{ backgroundColor: 'gray', padding: 20, borderRadius: 10 }}>
                                                                <Text className="text-white">{history.name}</Text>
                                                                <TouchableOpacity onPress={handleModalClose}>
                                                                    <Text>Close</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </Modal>
                                                )}
                                                <View className="ml-6 border-t border-gray-100" />
                                            </Pressable>
                                        ))}
                                    </Animated.ScrollView>
                                ) : (
                                    <View style={{ height: '100%' }} className="bg-white flex px-6 items-center justify-center">
                                        <Text className="text-2xl text-black">No results found.</Text>
                                    </View>
                                )}
                            </>
                        ) : (
                            <>
                                <Animated.ScrollView 
                                entering={FadeIn.delay(40).duration(100)} 
                                exiting={FadeOut.delay(40).duration(90)} 
                                className="mt-3 space-y-2 px-6"
                                contentContainerStyle={{
                                    paddingBottom:270
                                }}>
                                <Text className="text-xl text-black font-semibold">K-Pop Categories</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }} className="flex justify-between">
                                    {categories.map((category, index) => (
                                        <View style={{ width: '48.4%', height: 120 }} key={index} className="relative bg-white mb-3 rounded-xl">
                                            <Image style={{ width: '100%', height: '100%' }} source={category.image} className="rounded-xl opacity-90" />
                                            <Text className="absolute bottom-3 left-2 text-white font-bold">{category.name}</Text>
                                        </View>
                                    ))}
                                </View>
                                </Animated.ScrollView>
                            </>
                        )}
               
                </ScreenWrapper>
            </View>
            
<ComponentTrack/>
        </>
    )
}