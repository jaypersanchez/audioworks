import axios from "axios";
import { AudioTrack, AudioTag } from "../model/audio.model";

axios.defaults.baseURL = "http://localhost:3001/api";

export const getTracks = async (): Promise<AudioTrack[]> => {
  const { data } = await axios.get("/track");
  const tracks: AudioTrack[] = data;
  return tracks;
};

export const updateTrack = async (audioTag: AudioTag): Promise<AudioTrack> => {
  const { data } = await axios.put("/track", {
    audioTag: { ...audioTag },
  });
  const track: AudioTrack = data;
  return track;
};
