import React, { useEffect, useRef } from 'react';
import { NoToneMapping } from 'three';
import { manifest } from '../Engine/Manifest';

export const Game = () => {
  const gameScreen = useRef(null);

  useEffect(() => {
    manifest.init(gameScreen.current);
  }, []);

  return (
    <>
      <canvas ref={gameScreen} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        outline: 'none',
        zIndex: -10
      }}></canvas>
    </>
  );
}
