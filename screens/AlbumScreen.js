import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import BackButton from '../components/backButton';
import { ForwardIcon, PauseIcon, PlayIcon } from 'react-native-heroicons/solid';
import { colors } from '../theme';
import { EllipsisHorizontalIcon, PlusIcon } from 'react-native-heroicons/outline';
import { Player } from '../PlayContext';
import { BottomModal, ModalPortal } from "react-native-modals";
import { ModalContent } from "react-native-modals";

export default function AlbumScreen() {
    const { currentTrack, setCurrentTrack } = useContext(Player);
    
    const Album = [
        {
            id: 1,
            album: "Drama -The 4th Mini Album",
            singer: "aespa",
            desc: "Drama is the fourth extended play by South Korean girl group Aespa. It was released by SM Entertainment on November 10, 2023, and contains six tracks including the lead single of the same name.",
            songs: [{ id: 1, name: "Drama", image: require('../assets/images/Aespa_-_Drama.png') }, { id: 2, name: "Trick or Trick" }, { id: 3, name: "Don't Blink" }, { id: 4, name: "Hot Air Balloon" }, { id: 5, name: "YOLO" }, { id: 6, name: "You" }, { id: 7, name: "Better Things" }],
        },
        {
            id: 2,
            album: "MY WORLD - Album",
            singer: "aespa",
            desc: "Drama is the fourth extended play by South Korean girl group Aespa. It was released by SM Entertainment on November 10, 2023, and contains six tracks including the lead single of the same name.",
            songs: [{ id: 1, name: "Drama" }, { id: 2, name: "Trick or Trick" }, { id: 3, name: "Don't Blink" }, { id: 4, name: "Hot Air Balloon" }, { id: 5, name: "YOLO" }, { id: 6, name: "You" }, { id: 7, name: "Better Things" }],
        },
        {
            id: 3,
            album: "Girls - Album",
            singer: "aespa",
            desc: "aespa's 2nd mini album 'Girls' has 6 songs of various genres containing aespa’s worldview story, starting with the strong lead single ‘Girls’ and a bonus track ‘Life's Too Short’. The album has 1 cover, 1 polaroid card (random out of 4), 1 folded poster (random out of 4), 1 photo card (random out of 4), 1 US-exclusive Photo Card (random out of 4), and 1 poster(folded)(random out of 2). This is an official release from SM Entertainment, and counts towards Billboard (US Sales Only) and Gaon charts.",
            songs: [{ id: 1, name: "Girls" }, { id: 2, name: "Illusion" }, { id: 3, name: "Lingo" }, { id: 4, name: "Life's Too Short" }, { id: 5, name: "ICU" }, { id: 6, name: "Life's Too Short(English Version)" }, { id: 7, name: "Black Mamba" }, { id: 8, name: "Forever" }, { id: 9, name: "Dreams Come True" }]
        },
        {
            id: 4,
            album: "Savage - Album",
            singer: "aespa",
            desc: "Drama is the fourth extended play by South Korean girl group Aespa. It was released by SM Entertainment on November 10, 2023, and contains six tracks including the lead single of the same name.",
            songs: [{ id: 1, name: "Savage" }, { id: 2, name: "Trick or Trick" }, { id: 3, name: "Don't Blink" }, { id: 4, name: "Hot Air Balloon" }, { id: 5, name: "YOLO" }, { id: 6, name: "You" }, { id: 7, name: "Better Things" }],
        },

    ]
    const [ modalVisible, setModalVisible ] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const navigation = useNavigation();
    const { params } = useRoute();
    const [expanded, setExpanded] = useState(false);
    let category = params;
    // Assuming albums is your array of albums
    const matchedAlbum = Album.find(album => album.id === category.id);


    useEffect(() => {
      
    });

    const selectAndPlay = async (song) =>{
        setCurrentTrack(song);
        setActiveCategory(currentTrack?.id);
    }

    const playTrack = async () => {

        setCurrentTrack(matchedAlbum.songs[0]);
        setActiveCategory(currentTrack?.id);
        await play(matchedAlbum.songs[0])
    };
    console.log(currentTrack)
    console.log(currentTrack?.image)
    const play = async () => {

    }


    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    return (
        <>

            <View className="bg-white flex-1">

                <View style={{ backgroundColor: 'transparent' }} className="flex-row items-center sticky pt-6 pb-2 pr-6">

                    <BackButton />
                    <TouchableOpacity className="flex justify-center items-center p-3 ml-auto bg-gray-200 rounded-full h-8 w-8">
                        <PlusIcon strokeWidth={3} stroke={160} color="black" size="19"></PlusIcon>
                    </TouchableOpacity>
                </View>

                <ScrollView >

                    <View className="flex justify-center items-center space-y-3 px-6">
                        <Image
                            source={category.image}
                            style={{ height: 250, width: 250 }}
                            className="rounded-xl shadow-red-600 mb-2"
                        />
                        <Text className="text-gray-950 text-2xl font-bold">{category.name}</Text>
                        <Text className="text-xl">{category.singer}</Text>
                        <View className="flex-row flex px-4">
                            <TouchableOpacity onPress={()=>{playTrack}} className="py-3 bg-gray-200 flex-row flex justify-center items-center rounded-xl w-1/2 mr-3">
                                <PlayIcon color="white" />
                                <Text className="text-white text-lg font-bold ml-1">Play</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="py-3 bg-gray-200 flex-row flex justify-center items-center rounded-xl w-1/2 ml-3">
                                <PlayIcon color="white" />
                                <Text className="text-white text-lg text-center font-bold ml-1">Shuffle</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View className="mt-3 relative px-6">
                        <Text className="leading-5 bg-opacity-20" numberOfLines={expanded ? undefined : 2}>
                            {matchedAlbum.desc}
                        </Text>
                        {matchedAlbum.desc.length > 120 && (

                            <TouchableOpacity onPress={toggleDescription} className="absolute px-2 bottom-0 right-6">
                                <View className="bg-white bg-gradient-to-l from-gray-200 via-transparent to-transparent w-full pl-2">
                                    <Text className="text-gray-950 font-bold tracking-wide">{expanded ? 'Less' : 'More'}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View className="mt-3 ml-6 border-t border-gray-100" />
                    {
                        matchedAlbum.songs.map((song, index) => {
                            let isActive = song.id != activeCategory;
                            let btnClass = isActive ? 'bg-white' : 'bg-gray-100'
                            let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500'
                            return (
                                <View key={index} className={"" + btnClass}>
                                    <View className="ml-6 flex flex-row items-center">
                                        <TouchableOpacity
                                            onPress={() => selectAndPlay(song)}
                                            style={{ width: 'auto', flex: 1 }}

                                        >
                                            <View className="flex flex-row items-center">
                                                <Text className="ml-2 text-lg">{index + 1}</Text>
                                                <View

                                                    className="text-start pl-3 py-3">
                                                    <Text className="text-gray-950 text-lg">{song.name}</Text>

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="flex flex-row items-center pl-3 mr-6 h-full ml-auto">
                                            <EllipsisHorizontalIcon size="28" strokeWidth={1.8} color="black"></EllipsisHorizontalIcon>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="ml-6 border-t border-gray-100" />


                                </View>

                            );
                        })
                    }

                    <View className="ml-6 border-t border-gray-100 mb-3" />
                </ScrollView>
                {currentTrack && (
                    <TouchableWithoutFeedback
                    onPress={()=>{setModalVisible(!modalVisible)}}
                    style={{ width: '90%' }} className="bg-gray-100 mx-auto rounded-2xl mt-6 sticky p-2 flex flex-row items-center justify-between bottom-3 shadow-2xl">

                        <View className="flex-row justify-center items-center gap-3">
                            <Image source={currentTrack?.image} style={{ width: 50, height: 50 }} className="rounded-lg">

                            </Image>
                            <Text numberOfLines={1} className="font-bold text-lg text-gray-950">
                                {currentTrack?.name}
                            </Text>
                        </View>
                        <View className="flex-row gap-2 mr-3">
                            <PauseIcon color="black" strokeWidth={2} stroke={200} size="30"></PauseIcon>
                            <ForwardIcon color="black" size="30"></ForwardIcon>
                        </View>

                    </TouchableWithoutFeedback>
                )}
            </View>


            <ModalPortal>
                <BottomModal
                 visible={modalVisible} 
                 onHardWareBackPress={()=>setModalVisible(false)} 
                 swipeDirection={["up","down"]} 
                 swipeThreshold={200}
                >
<ModalContent className="h-full w-full">
<View>
            {/* Your multiple components go here */}
            <Text>Component 1</Text>
            <Text>Component 2</Text>
            <Text>Component 3</Text>
        </View>
</ModalContent>
</BottomModal>
</ModalPortal>
        </>
    );

}

