import React, { useState, useEffect, useCallback } from "react";
import { FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import "./MusicPlayer.css"; // Importa tu archivo CSS para el estilo

function MusicPlayer() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("Cupid");

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);

    const audio = document.getElementById("audio-element");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleNextTrack = useCallback(() => {
    const randomTrackIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrack(randomTrackIndex);
    const audio = document.getElementById("audio-element");
    audio.load();
    audio.play();
  }, [tracks]);

  useEffect(() => {
    const audio = document.getElementById("audio-element");

    // Escucha el evento "ended" del elemento de audio
    const handleAudioEnd = () => {
      // Reproduce la siguiente pista aleatoria
      handleNextTrack();
    };

    // Adjunta el escucha del evento
    audio.addEventListener("ended", handleAudioEnd);

    // Elimina el escucha del evento cuando se desmonta el componente
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [handleNextTrack]);

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "7eff033b369641cd80a5117ab57b6ba6:db16b7bd3c4543918249cf580fd59cfd"
          ),
      },
      body: "grant_type=client_credentials",
    })
      .then((response) => response.json())
      .then((data) => setToken(data.access_token));
  }, []);

  useEffect(() => {
    if (token) {
      fetch(
        `https://api.spotify.com/v1/search?q=${search}&type=track&limit=1`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setTracks(data.tracks.items));
    }
  }, [token, search]);

  return (
    
    <div className="music-player-container">
      
      <div className="search-and-controls">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar música..."
        />
        <div className="music-controls">
          <button onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          {/* <button onClick={handleNextTrack}>
            <FaStepForward />
          </button> */}
        </div>
      </div>
      <div className="current-track-info">
        <h2>{tracks[currentTrack]?.name}</h2>
        <h3>{tracks[currentTrack]?.artists[0].name}</h3>
        <img src={tracks[currentTrack]?.album.images[0].url} alt="track" />
      </div>
      {/* Utiliza el elemento de audio HTML5 para la reproducción */}
      <audio id="audio-element" src={tracks[currentTrack]?.preview_url}></audio>
    </div>
  );
}

export { MusicPlayer };
