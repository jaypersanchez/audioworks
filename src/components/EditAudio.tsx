import React, { useEffect, useState, useContext } from "react";
import { AudioTag, AudioTrack } from "../model/audio.model";
import { AudioCard } from "../components/AudioCard";
import { AudioContext } from "../context/AudioContext";

interface Props {
  track?: AudioTrack;
  onCancel: () => void;
}

export const EditAudio: React.FC<Props> = ({ track, onCancel }) => {
  const [title, setTitle] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [album, setAlbum] = useState<string>();
  const [genre, setGenre] = useState<string>();

  const { updateAudio } = useContext(AudioContext);

  const onUpdate = () => {
    if (title && artist && album && genre && track)
      updateAudio({
        title,
        artist,
        album,
        genre,
        fileName: track.fileName,
      } as AudioTag);
  };

  useEffect(() => {
    if (track) {
      setTitle(track.title);
      setArtist(track.artist);
      setAlbum(track.album);
      setGenre(track.genre);
    }
  }, [track]);
  return (
    <AudioCard>
      <h3 className='fw-medium text-white'>Edit Audio</h3>
      <div className='row mt-4'>
        <div className='col-md-6'>
          <div className='mb-3'>
            <label className='form-label text-white'>Title</label>
            <input
              type='text'
              className='form-control'
              value={title ? title : ""}
              onChange={({ target: { value } }) => setTitle(value)}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='mb-3'>
            <label className='form-label text-white'>Artist</label>
            <input
              type='text'
              className='form-control'
              value={artist ? artist : ""}
              onChange={({ target: { value } }) => setArtist(value)}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='mb-3'>
            <label className='form-label text-white'>Album</label>
            <input
              type='text'
              className='form-control'
              value={album ? album : ""}
              onChange={({ target: { value } }) => setAlbum(value)}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='mb-3'>
            <label className='form-label text-white'>Genre</label>
            <input
              type='text'
              className='form-control'
              value={genre ? genre : ""}
              onChange={({ target: { value } }) => setGenre(value)}
            />
          </div>
        </div>
        <div className='col-12 d-flex justify-content-between'>
          <button
            type='button'
            className='btn btn-danger mt-3'
            onClick={onCancel}>
            Cancel
          </button>
          <button
            type='button'
            className='btn btn-primary mt-3'
            onClick={onUpdate}>
            Update
          </button>
        </div>
      </div>
    </AudioCard>
  );
};
