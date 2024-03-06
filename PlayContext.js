import { createContext,useState } from "react";

const Player = createContext();

const PlayerContext = ({children}) => {
    const [currentTrack,setCurrentTrack] = useState(null);
    const [currentAlbum,setCurrentAlbum] = useState(null);

    return (
        <Player.Provider value={{currentTrack, setCurrentTrack, currentAlbum, setCurrentAlbum}}>
            {children}
        </Player.Provider>
    )
}

export {PlayerContext,Player}