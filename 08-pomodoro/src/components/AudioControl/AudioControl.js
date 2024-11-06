import React, { useEffect, useState, useRef } from "react";
import "./AudioControl.css";
import "hover.css";

export default function AudioControl({ clockStatus, videoRef }) {
  const audioRef = useRef(null); // Reference to the current audio element
  const currentAudioRef = useRef(null); // Reference to the currently playing audio
  const [playingAudioId, setPlayingAudioId] = useState(null); // State to track the ID of the currently playing audio

  // List of audio tracks with their corresponding metadata
  const audioList = [
    {
      id: 1,
      src: "./audio/winds.mp3",
      bgImage: "./bg-images/winds.jpg",
      name: "winds",
    },
    {
      id: 2,
      src: "./audio/rain.mp3",
      bgImage: "./bg-images/rain.jpg",
      name: "rain",
    },
    {
      id: 3,
      src: "./audio/birds.mp3",
      bgImage: "./bg-images/birds.jpg",
      name: "birds",
    },
    {
      id: 4,
      src: "./audio/ocean.mp3",
      bgImage: "./bg-images/ocean.jpg",
      name: "ocean",
    },
    {
      id: 5,
      src: "./audio/forest.mp3",
      bgImage: "./bg-images/forest.jpg",
      name: "forest",
    },
    {
      id: 6,
      src: "./audio/cafe.mp3",
      bgImage: "./bg-images/cafe.jpg",
      name: "cafe",
    },
  ];

  useEffect(() => {
    // Event listener for audio playback based on clock status
    if (clockStatus === "Pause") {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause(); // Pause the current audio if status is "Pause"
      }
    } else if (clockStatus === "running") {
      if (playingAudioId && currentAudioRef.current) {
        currentAudioRef.current.play(); // Resume playback if there's an audio playing
      }
    } else if (clockStatus === "close") {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause(); // Pause audio when status is "close"
        setPlayingAudioId(null); // Reset the playing audio ID
      }
    }
  }, [clockStatus]); // Only re-run effect if clockStatus changes

  const handlePlay = (audio) => {
    // Handle audio play and pause logic
    console.log(audio.id, playingAudioId); // Log the audio id and currently playing audio id for debugging

    if (clockStatus === "running") {
      if (playingAudioId !== audio.id) {
        // If the clicked audio is different from the currently playing audio, pause it
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
        }

        // Update the audio element's source to the new audio
        audioRef.current.src = audio.src;

        // Play the new audio
        audioRef.current.play();

        // Update references and state for the currently playing audio
        currentAudioRef.current = audioRef.current;
        setPlayingAudioId(audio.id);
        // Change background image according to the audio being played
        document.querySelector(
          "body"
        ).style.backgroundImage = `url(${audio.bgImage})`;
      } else {
        // If the clicked audio is the same as the currently playing audio, pause it
        currentAudioRef.current.pause();
        setPlayingAudioId(null); // Reset the playing audio ID
      }
    } else {
      // If the clock status is not "running", simply update the playing audio ID and source
      if (audio.id !== playingAudioId) {
        setPlayingAudioId(audio.id);
        document.querySelector(
          "body"
        ).style.backgroundImage = `url(${audio.bgImage})`;
        audioRef.current.src = audio.src;
        currentAudioRef.current = audioRef.current; // Update current audio reference
      }
    }
  };

  return (
    <div className="audio-control">
      {audioList.map((audio) => (
        <div className="audio-item" key={audio.id}>
          <button onClick={() => handlePlay(audio)}>
            {playingAudioId === audio.id && clockStatus === "running" ? (
              <div className="audio-wrapper regular">
                <div className="bar-1"></div>
                <div className="bar-2"></div>
                <div className="bar-3"></div>
                <div className="bar-4"></div>
                <div className="bar-5"></div>
              </div>
            ) : (
              ""
            )}
            <p className="button hvr-grow">{audio.name}</p>
          </button>
        </div>
      ))}
      <audio ref={audioRef} loop={true} /> {/* Audio element for playback */}
    </div>
  );
}
