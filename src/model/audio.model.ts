export interface AudioTrack extends AudioTag {
  isActive?: boolean;
  source?: string;
}

export interface AudioTag {
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
  fileName?: string;
}
