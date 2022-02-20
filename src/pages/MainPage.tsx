import React, { useEffect, useState, useContext } from "react";
import { AudioPlayer } from "../components/AdioPlayer";
import { AudioTrack } from "../model/audio.model";
import { AudioContext } from "../context/AudioContext";
import { AudioCard } from "../components/AudioCard";
import { EditAudio } from "../components/EditAudio";

interface Props {}

export const MainPage: React.FC<Props> = () => {
  const [activeTrack, setActiveTrack] = useState<AudioTrack>();
  const [editing, setEditing] = useState<boolean>(false);

  const { tracks, trackChangeActive } = useContext(AudioContext);

  useEffect(() => {
    setEditing(false);
    setActiveTrack(tracks?.find((tl) => tl.isActive));
  }, [tracks]);

  const onListSelect = (itemIndex: number) => () => {
    trackChangeActive(itemIndex);
  };

  return (
    <div className='main-page'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <AudioCard>
              <h3 className='fw-medium text-white'>Audio List</h3>
              <ul className='list-group mt-4'>
                {!!tracks &&
                  tracks.map((item, i) => (
                    <li
                      key={i}
                      onClick={onListSelect(i)}
                      className={`list-group-item ${
                        item.isActive && "active"
                      }`}>
                      {item.fileName}
                    </li>
                  ))}
              </ul>
            </AudioCard>
          </div>
          <div className='col-md-8'>
            {editing ? (
              <EditAudio
                track={activeTrack}
                onCancel={() => setEditing(false)}
              />
            ) : (
              <div className='row'>
                <div className='col-12'>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => setEditing(true)}>
                    Edit
                  </button>
                </div>
                <div className='col-md-6 mx-auto'>
                  <AudioPlayer track={activeTrack} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
