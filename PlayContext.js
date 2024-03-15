import { createContext,useEffect,useState } from "react";
import Sound from "react-native-sound";

const Player = createContext();

const PlayerContext = ({children}) => {
    const [currentTrack,setCurrentTrack] = useState(null);
    const [currentAlbum,setCurrentAlbum] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filled, setFilled] = useState(true);

    const [ currentSound, setCurrentSound ] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const[ widthPercentage,setWidthPercentage ] = useState(0);
    const[ duration,setDuration ] = useState(0);
    // Enable playback in silence mode
    Sound.setCategory('Playback');

const playSound = () => {
    
    if(!isPlaying){
     
        console.log("play!",currentSound)
        setIsPlaying(true);
      
    currentSound.play((success) => {
       
        if (success) {
            setIsPlaying(false);
            console.log('Audio playback successful');   
            currentSound.getCurrentTime((seconds) => {
                setCurrentTime(seconds); // Update current time state
                setWidthPercentage(((seconds / duration) * 100));
            });
        } else {
            console.log('Audio playback failed');
        }
    });
    currentSound.getCurrentTime((seconds) => {
        setCurrentTime(seconds); // Update current time state
        setWidthPercentage(((seconds / duration) * 100));
    });  
}
        else if(isPlaying){
            console.log("pause!")
        currentSound.pause();
        setIsPlaying(false);
    }
}

const play = async (nextTrack) => {
  
    const preview_url = nextTrack?.track?.preview_url;
    console.log("got track")
    if (currentSound) {
                currentSound.stop(() => {
                    console.log('Stopped the current track');
                });
                setCurrentSound(null);
            }

    try {
    
        const sound = new Sound(preview_url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error(error);
                return;
            }
                setCurrentSound(sound);
                setDuration(sound.getDuration())
                console.log("Set current sound:", sound);
                sound.play((success) => {
                    
                    if (success) {
                        setIsPlaying(false);
                        console.log('Audio playback successful');
                        sound.getCurrentTime((seconds) => {
                            setCurrentTime(seconds); // Update current time state
                            setWidthPercentage(((seconds / duration) * 100));
                        });
                       
                    } else {
                        console.log('Audio playback failed');
                    }
                });
                sound.getCurrentTime((seconds) => {
                    setCurrentTime(seconds); // Update current time state
                    setWidthPercentage(((seconds / duration) * 100));
                });
                setIsPlaying(true);
             
        });
  
        console.log("sound:",sound);
        setIsPlaying(true)
        setCurrentSound(sound);
        console.log("got set sound",currentSound);
    } catch (err) {
        console.error(err.message);
    }
};

     // Function to handle pause/play button press
     const handlePausePlay = () => {
        if (currentSound) {
            playSound();
            console.log("got set sound",currentSound);
        }
    };

    return (
        <Player.Provider value={{currentTrack, setCurrentTrack, currentAlbum, setCurrentAlbum, modalVisible, setModalVisible, filled, setFilled, isPlaying, currentSound,currentTime, setCurrentTime, handlePausePlay, play,widthPercentage,setWidthPercentage}}>
            {children}
        </Player.Provider>
    )
}

export {PlayerContext,Player}