import React, { useState, useEffect, useContext, useRef } from "react";
import { AudioCard } from "./AudioCard";
import { AudioController } from "./AudioController";
import { AudioTrack } from "../model/audio.model";

interface Props {
  track?: AudioTrack;
}

export const AudioPlayer: React.FC<Props> = ({ track }) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [trackCurrTime, setTrackCurrTime] = useState<String>("0:00");
  const [trackDuration, setTrackDuration] = useState<String>("0:00");

  let audio = useRef<HTMLAudioElement>(new Audio(track?.source));

  useEffect(() => {
    if (track) {
      audio.current.pause();
      setPlaying(false);
      audio.current = new Audio(track.source);

      console.log("tackChange");
      return () => {
        audio.current.pause();
        setPlaying(false);
        setTrackCurrTime("0:00");
        setTrackDuration("0:00");
        audio.current.remove();
        console.log("audioPlayer cleanup");
      };
    }
  }, [track]);

  useEffect(() => {
    audio.current.ontimeupdate = () => {
      if (audio.current.ended) {
        setPlaying(false);
      } else {
        setTrackProgress(audio.current.currentTime);
      }
      if (audio.current.readyState) {
        const minutes = Math.floor(audio.current.currentTime / 60);
        const seconds = Math.floor(audio.current.currentTime - minutes * 60);
        setTrackCurrTime(`${minutes}:${setTime(seconds)}`);
        const durMin = Math.floor(audio.current.duration / 60);
        const durSec = Math.floor(audio.current.duration - durMin * 60);
        setTrackDuration(`${durMin}:${setTime(durSec)}`);
      }
    };
  }, [audio.current]);

  const setTime = (time: number): string =>
    (time > 9 ? time : `0${time}`) as string;

  const currentPercentage = audio.current.duration
    ? (trackProgress / audio.current.duration) * 100
    : 0;

  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}%, #b8b8b8), color-stop(${currentPercentage}%, #777))
  `;

  const togglePlayPause = () => setPlaying((prev) => !prev);

  useEffect(() => {
    if (playing) audio.current.play();
    else audio.current.pause();
  }, [playing]);

  const onTrackChange = (value: number) => {
    audio.current.currentTime = value;
    setTrackProgress(audio.current.currentTime);
  };
  const onTrackEnd = () => {
    if (!playing) setPlaying(true);
  };

  const prev = () => {};
  const next = () => {};

  return (
    <>
      <AudioCard>
        <h4 className='text-white-50 text-center mb-3'>{track?.title}</h4>
        <AudioController
          playing={playing}
          togglePlayPause={togglePlayPause}
          prev={prev}
          next={next}
        />
        <div className='ap-track-time text-white-50'>
          <span>{trackCurrTime}</span>
          <span>{trackDuration}</span>
        </div>

        <input
          type='range'
          value={trackProgress}
          step='1'
          min='0'
          max={
            audio.current.duration
              ? audio.current.duration
              : `${audio.current.duration}`
          }
          className='ap-track-prog'
          onChange={({ target: { value } }) => onTrackChange(+value)}
          onMouseUp={onTrackEnd}
          onKeyUp={onTrackEnd}
          style={{ background: trackStyling }}
        />
      </AudioCard>
    </>
  );
};
