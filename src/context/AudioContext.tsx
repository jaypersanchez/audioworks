import React, { createContext, useState, ReactChild, useEffect } from "react";
import { useQuery } from "react-query";
import { getTracks, updateTrack } from "../api/audio.api";
import { AudioTag, AudioTrack } from "../model/audio.model";

interface IAudioContext {
  tracks: AudioTrack[];
  updateAudio: (audioTag: AudioTag) => void;
  trackChangeActive: (trackIndex: number) => void;
}

const INITIAL_AUDIO_CONTEXT = {
  tracks: [] as AudioTrack[],
  updateAudio: async (audioTag: AudioTag) => {},
  trackChangeActive: (trackIndex: number) => {},
};

export const AudioContext = createContext<IAudioContext>(INITIAL_AUDIO_CONTEXT);

interface Props {
  children: ReactChild;
}

const AudioContextProvider: React.FC<Props> = ({ children }) => {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);

  const { data: tracksData } = useQuery("tracks", getTracks);

  useEffect(() => {
    if (tracksData)
      setTracks(
        tracksData.map((td, i) => ({
          ...td,
          isActive: i === 0 ? true : false,
          source: `http://localhost:3001/api/track/${td.fileName}`,
        }))
      );
  }, [tracksData]);

  const updateAudio = async (audioTag: AudioTag) => {
    const track = await updateTrack(audioTag);
    setTracks((prev) =>
      prev.map((t) => {
        if (t.fileName === track.fileName)
          return {
            ...track,
            isActive: t.isActive,
            source: t.source,
          };
        else return t;
      })
    );
    console.log(track);
  };

  const trackChangeActive = (trackIndex: number) => {
    setTracks((prev) =>
      prev?.map((track, i) => {
        if (trackIndex === i) track.isActive = true;
        else track.isActive = false;
        return track;
      })
    );
  };

  return (
    <AudioContext.Provider value={{ tracks, updateAudio, trackChangeActive }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContextProvider;
