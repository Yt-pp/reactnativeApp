import { createContext,useState } from "react";

const Player = createContext();

const PlayerContext = ({children}) => {
    const [currentTrack,setCurrentTrack] = useState(null);
    const [currentAlbum,setCurrentAlbum] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filled, setFilled] = useState(true);

    return (
        <Player.Provider value={{currentTrack, setCurrentTrack, currentAlbum, setCurrentAlbum, modalVisible, setModalVisible, filled, setFilled}}>
            {children}
        </Player.Provider>
    )
}

export {PlayerContext,Player}