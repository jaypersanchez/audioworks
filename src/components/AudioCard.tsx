import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AudioCard: React.FC<Props> = ({ children }) => {
  return (
    <div className='ac-card'>
      <div className='ac-card-body'>{children}</div>
    </div>
  );
};
