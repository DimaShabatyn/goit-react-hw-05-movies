import React from 'react';
import { LoaderBackdrop } from './Loader.styled';
import ScaleLoader from 'react-spinners/ScaleLoader';

export const Loader = () => {
  return (
    <LoaderBackdrop>
      <ScaleLoader 
      color="#36d7b7"
      size={150}
      cssOverride={{ position: 'absolute', top: '25%', left: '45%' }}
      />
    </LoaderBackdrop>
  );
};
