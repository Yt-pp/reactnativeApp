import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { ForwardIcon, PauseIcon, PlayIcon } from 'react-native-heroicons/solid';
import { Player } from '../PlayContext';
import Sound from 'react-native-sound';

export default function ComponentTrack() {
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const { currentAlbum, setCurrentAlbum } = useContext(Player);
    const { modalVisible, setModalVisible } = useContext(Player);
    const [ currentSound, setCurrentSound ] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [start,setStart] = useState(false);
// Enable playback in silence mode
Sound.setCategory('Playback');

const playSound = () => {
    if(!isPlaying || start){
     
        console.log("play")
    currentSound.play((success) => {
                    
        if (success) {
            console.log('Audio playback successful');
            setIsPlaying(false);
            
        } else {
            console.log('Audio playback failed');
        }
    });}
        else{
            console.log("pause")
        currentSound.pause();
    }
}

const play = async (nextTrack) => {
  
    const preview_url = nextTrack?.track?.preview_url;
    console.log("got track")
    // Stop the currently playing track, if any
    if (currentSound) {
        currentSound.stop(() => {
            console.log('Stopped the current track');
        });
        currentSound.release(); // Release the resources associated with the current sound
        setCurrentSound(null);
    }

    try {
        setIsPlaying(true);
      
        setStart(true);
        
        
        const sound = new Sound(preview_url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error(error);
                return;
            }else{
            setCurrentSound(sound);
            console.log("got set sound",sound)
           
        }
        });   
        
    } catch (err) {
        console.error(err.message);
    }
};

     // Function to handle pause/play button press
     const handlePausePlay = () => {
        if (currentSound) {
            playSound();
            setIsPlaying(!isPlaying); // Toggle the playing state
        }
    };

    useEffect(() => {
        if (currentTrack) {
            play(currentTrack);
            console.log("got run play")
        }
    }, [currentTrack]);

    useEffect(() => {
        if (start) {
            playSound();
            console.log("got run")
        }
    }, [currentSound]);
   
  return (    
    <>
     <View style={{bottom:80}} className="absolute left-0 right-0">
    {currentTrack && (
        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
            <View style={{ width: '90%' }} className="bg-gray-100 mx-auto rounded-2xl fixed p-2 flex flex-row items-center justify-between bottom-3 shadow-2xl mt-6">
                <View className="flex-row justify-start items-center gap-1">
                    {/* <Image source={currentAlbum?.image} style={{ width: 50, height: 50 }} className="rounded-lg" /> */}
                    <Image source={{uri:currentTrack?.track.album.images[0].url}} style={{ width: 50, height: 50 }} className="rounded-lg" />
                    <Text numberOfLines={1} className="font-bold text-lg text-gray-950" style={{width:'70%'}}>
                        {currentTrack?.track.name}
                    </Text>
                </View>
                <View className="flex-row gap-2 ml-auto">
                    <TouchableOpacity onPress={handlePausePlay}>
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