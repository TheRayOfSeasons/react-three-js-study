import React, { useEffect, useRef } from 'react';
import { manifest } from '../Engine/Manifest';

export const Game = () => {
  const gameScreen = useRef(null);

  useEffect(() => {
    manifest.init(gameScreen.current);
  }, []);

  return (
    <>
      <canvas ref={gameScreen}></canvas>
    </>
  );
}
