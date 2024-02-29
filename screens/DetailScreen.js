import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/core'
import imageSequence from '../assets/images/image';
import BackButton from '../components/backButton';
import { colors } from '../theme';
import StarRating from 'react-native-star-rating';

const categories = [
    {
        id:1,
        name: "Drama - Album",
        singer: "aespa",
        image: require('../assets/images/Aespa_-_Drama.png'),
        year:2024,
    },
    {
        id:2,
        name: "MY WORLD - Album",
        singer: "aespa",
        image: require('../assets/images/spicy.jpg'),
        year:2023,
    },
    {
        id:3,
        name: "Girls - Album",
        singer: "aespa",
        image: require('../assets/images/girls.jpg'),
        year:2022,
    },
    {
        id:4,
        name: "Savage - Album",
        singer: "aespa",
        image: require('../assets/images/savage.jpg'),
        year:2021,
    },
]

const Songs = [
    {
        id:1,
        name: "Drama",
        singer: "aespa",
        image: require('../assets/images/Aespa_-_Drama.png'),
    },
    {
        id:2,
        name: "Girls",
        singer: "aespa",
        image: require('../assets/images/girls.jpg'),
    },
    {
        id:3,
        name: "Spicy",
        singer: "aespa",
        image: require('../assets/images/spicy.jpg'),
    },
    {
        id:4,
        name: "Savage",
        singer: "aespa",
        image: require('../assets/images/savage.jpg'),
    },
]


export default function DetailScreen() {
    const [activeCategory, setActiveCategory] = useState(null);

    const {params} = useRoute();
    let item = params;
    // console.log('item: ', item)
  return (
    <View className="bg-white h-full">
        <ScrollView>
            <View className="relative">
                <Image className="w-full h-72" source={imageSequence(item.id)}></Image>
                <View className="absolute top-5 left-5">
                <BackButton></BackButton>
                </View>
            </View>
            <View 
            style={{borderTopLeftRadius: 40,borderTopRightRadius: 40}}
            className="bg-white px-5 -mt-12 pt-6"
            >
                <View className="space-y-2">
                    <Text className={`${colors.heading} text-gray-950 text-3xl font-bold`}>{item.name}</Text>
                    
                    
                    <Text className=" text-gray-500 font-semibold">{item.team}</Text>
                </View>

                <StarRating
        disabled={true}
        starSize={30}
        maxStars={5}
        containerStyle={{width:120}}
        rating={item.stars}
        emptyStarColor="lightgray"
        fullStar={require('../assets/images/fullstar.png')}
      />

                <View style={{flexDirection: 'row', alignItems: 'center'}} className="mt-5 mb-5">
        
                        <View style={{flex: 1, height: 1}} className="bg-gray-200" />
                            
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
                            categories.map((category, index)=>{
                                let isActive = category.id==activeCategory;
                                let btnClass = isActive? 'bg-gray-600' : 'bg-gray-200'
                                let textClass = isActive? 'font-semibold text-gray-800' : 'text-gray-500'
                                return (
                                    <View key={index} className="mr-6">
                                    <TouchableOpacity
                
                                    onPress={()=> setActiveCategory(category.id)}
                                    className={"flex flex-row justify-center items-center p-1 rounded-lg shadow-2xl bg-white"+btnClass}
                                    >
                                        <Image 
                                         style={{width: 80, height: 80}}
                                         source={category.image}
                                         className="rounded-lg"
                                        ></Image>
                                        <View 
                                        style={{minWidth:150}}
                                        className="bg-white pl-3 pr-5 py-5">
                                        <Text className="text-gray-950 text-lg font-extrabold">{category.name}</Text>
                                        <Text className="text-gray-400 text-sm font-semibold">{category.singer} - {category.year}</Text>
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
                            Songs.map((song, index)=>{
                                
                                return (
                                    <View key={index} className="mr-1">
                                    <TouchableOpacity
                                    onPress={() => {
                                            console.log(song);
                                        }}
                                    className="p-1 rounded-lg shadow-2xl bg-white"
                                    >
                                        <Image 
                                         style={{width: 160, height: 160}}
                                         source={song.image}
                                         className="rounded-xl"
                                        ></Image>
                                        <View 
                                        style={{maxWidth:150}}
                                        className="bg-white">
                                        <Text className="text-gray-950 text-lg font-semibold">{song.name}</Text>
                                        <Text style={{ marginTop: -10 }} className="text-gray-400 text-lg font-semibold">{song.singer}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    </View>
                                );
                            })
                    }

                </ScrollView>

            </View>
        </ScrollView>

    </View>
  )
}