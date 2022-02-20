import React from "react";
interface Props {
  playing: boolean;
  togglePlayPause: () => void;
  prev: () => void;
  next: () => void;
}

export const AudioController: React.FC<Props> = ({
  playing,
  togglePlayPause,
  prev,
  next,
}) => {
  return (
    <div className='ap-controller'>
      <div className='control' onClick={prev}>
        <i className='fa fa-backward'></i>
      </div>
      <div className='control play mx-4 mx-lg-5' onClick={togglePlayPause}>
        <i className={`fa fa-${playing ? "pause" : "play"}`}></i>
      </div>
      <div className='control' onClick={next}>
        <i className='fa fa-forward'></i>
      </div>
    </div>
  );
};
