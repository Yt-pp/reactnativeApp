import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import imageSequence from '../assets/images/image';
import BackButton from '../components/backButton';
import { colors } from '../theme';
import StarRating from 'react-native-star-rating';
import { StarIcon } from "react-native-heroicons/outline";
import HeartButton from '../components/heartButton';
import ScreenWrapper from '../components/screenWrapper'
import ComponentTrack from '../components/componentTrack';
import { Player } from '../PlayContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView,TapGestureHandler } from 'react-native-gesture-handler';
import axios from 'axios';
import { HeartIcon } from 'react-native-heroicons/solid';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const categories = [
    {
        id: 1,
        name: "Drama - Album",
        singer: "aespa",
        image: require('../assets/images/Aespa_-_Drama.png'),
        year: 2024,
        desc: "Drama is the fourth extended play by South Korean girl group Aespa. It was released by SM Entertainment on November 10, 2023, and contains six tracks including the lead single of the same name."
    },
    {
        id: 2,
        name: "MY WORLD - Album",
        singer: "aespa",
        image: require('../assets/images/spicy.jpg'),
        year: 2023,
    },
    {
        id: 3,
        name: "Girls - Album",
        singer: "aespa",
        image: require('../assets/images/girls.jpg'),
        year: 2022,
    },
    {
        id: 4,
        name: "Savage - Album",
        singer: "aespa",
        image: require('../assets/images/savage.jpg'),
        year: 2021,
    },
]

const Songs = [
    {
        id: 1,
        name: "Drama",
        singer: "aespa",
        image: require('../assets/images/Aespa_-_Drama.png'),
    },
    {
        id: 2,
        name: "Girls",
        singer: "aespa",
        image: require('../assets/images/girls.jpg'),
    },
    {
        id: 3,
        name: "Spicy",
        singer: "aespa",
        image: require('../assets/images/spicy.jpg'),
    },
    {
        id: 4,
        name: "Savage",
        singer: "aespa",
        image: require('../assets/images/savage.jpg'),
    },
]

const AnimatedImage = Animated.createAnimatedComponent(Image)
export default function DetailScreen() {
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const [activeCategory, setActiveCategory] = useState(null);
    const navigation = useNavigation();
    const { params } = useRoute();
    let item = params;

    const [artistAlbum, setArtistAlbum] = useState([]);

    const getArtistAlbum = async () => {
        const accessToken = await AsyncStorage.getItem("token");
        try {
            const response = await axios({
                method: "GET",
                url: "https://api.spotify.com/v1/artists/6YVMFz59CuY7ngCxTxjpxE/albums",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            const data = await response.data.items;
            setArtistAlbum(data);

        } catch (error) {
            console.log(error.message)
        }
    };


    //console.log(recentlyPlayed)
    useEffect(() => {
        getArtistAlbum();
    }, [])


    function formatReleaseYear(dateString) {
        if (!dateString) {
            return "N/A";
        }

        const date = new Date(dateString);
        const year = date.getFullYear();

        return year.toString();
    }

    const doubleTapRef = useRef();
    const scaleForHeart = useSharedValue(0);
    const sStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: Math.max(scaleForHeart.value, 0) }
        ]
    }));
    const onDoubleTap = useCallback(() => {
        scaleForHeart.value = withSpring(0.5, undefined, (isFinished) => {
            if (isFinished) {
                scaleForHeart.value = withSpring(0);
            }
        });
    }, []);
    // console.log('item: ', item)
    return (

        <View className="bg-white flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: currentTrack ? 160 : 80, }}>
                <View className="relative">
                    <GestureHandlerRootView>
                       
                    <TapGestureHandler
                    maxDelayMs={250}
                    ref={doubleTapRef}
                    numberOfTaps={2}
                    onActivated={onDoubleTap}
                    >
                     <Animated.View>
                        <ImageBackground className="w-full h-72" source={imageSequence(item.id)}>
                            <AnimatedImage className="w-full h-52"
                                resizeMode={'center'}
                                source={require('../assets/images/heart.png')}
                                style={[sStyle]} />
                        </ImageBackground>
                        </Animated.View>
                        </TapGestureHandler>
                  
                    </GestureHandlerRootView>
                    <View className="absolute top-10 left-5">
                        <BackButton></BackButton>
                    </View>
                    <View className="absolute top-10 right-5">
                        <HeartButton></HeartButton>
                    </View>
                </View>
                <View
                    style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className="bg-white px-5 -mt-12 pt-6"
                >
                    <View className="space-y-2 mb-3">
                        <Text className={`${colors.heading} text-gray-950 text-3xl font-bold`}>{item.name}</Text>


                        <Text className=" text-gray-500 font-semibold">{item.team}</Text>
                    </View>

                    <StarRating
                        disabled={true}
                        starSize={23}
                        maxStars={5}
                        containerStyle={{ width: 120 }}
                        interitemSpacing={20}
                        rating={item.stars}
                        emptyStarColor="lightgray"
                        emptyStar={require('../assets/images/unselect_star.png')}
                        fullStar={require('../assets/images/select_star.png')}
                    />




                    <View style={{ flexDirection: 'row', alignItems: 'center' }} className="mt-5 mb-5">

                        <View style={{ flex: 1, height: 1 }} className="bg-gray-200" />

                    </View>

                    <View>
                        <Text className="text-gray-950 font-bold mb-3">Description</Text>
                        <Text className="text-gray-500 text-sm">{item.desc}</Text>
                    </View>

                    <Text className="text-gray-950 text-xl font-bold mt-5">Album</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="overflow-visible"
                    >

                        {
                            artistAlbum.map((category, index) => {
                                let isActive = category.id == activeCategory;
                                let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200'
                                let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500'
                                return (
                                    <View key={index} className="mr-6">
                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate('Album', { ...category }) }}
                                            className={"flex flex-row justify-center items-center p-1 rounded-lg shadow-2xl bg-white" + btnClass}
                                        >
                                            <Image
                                                style={{ width: 80, height: 80 }}
                                                source={{ uri: category?.images[0].url }}
                                                className="rounded-lg"
                                            ></Image>
                                            <View
                                                style={{ width: 150 }}
                                                className="bg-white pl-3 pr-5 py-5">
                                                <Text numberOfLines={1} className="text-gray-950 text-lg font-extrabold">{category?.name}</Text>
                                                <Text className="text-gray-400 text-sm font-semibold">{category?.artists[0].name} - {formatReleaseYear(category?.release_date)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }

                    </ScrollView>

                    <Text className="text-gray-950 text-xl font-bold mt-5">Top Songs </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="overflow-visible"

                    >

                        {
                            Songs.map((song, index) => {

                                return (
                                    <View key={index} className="mr-2">
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log(song);
                                            }}
                                            className="p-1 rounded-lg bg-white"
                                        >
                                            <Image
                                                style={{ width: 160, height: 160 }}
                                                source={song.image}
                                                className="rounded-xl"
                                            ></Image>
                                            <View
                                                style={{ maxWidth: 150 }}
                                                className="bg-white">
                                                <Text className="text-gray-950 text-lg">{song.name}</Text>
                                                <Text style={{ marginTop: -10 }} className="text-gray-400 text-lg">{item.team}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }

                    </ScrollView>

                </View>

            </ScrollView>

            <ComponentTrack />

        </View>

    )
}