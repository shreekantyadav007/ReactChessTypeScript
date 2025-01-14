import React from 'react';
import { pieceIcons } from '../logic/chessLogic';

interface CapturedPiecesProps {
  capturedPieces: {
    white: string[];
    black: string[];
  };
}

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ capturedPieces }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg mb-2">Captured Pieces</h3>
      <div className="flex">
        <div className="mr-4">
          <h4>White:</h4>
          <div className="flex">
            {capturedPieces.white.map((piece, index) => (
              <div key={index} className="mr-1">{pieceIcons[piece]}</div>
            ))}
          </div>
        </div>
        <div>
          <h4>Black:</h4>
          <div className="flex">
            {capturedPieces.black.map((piece, index) => (
              <div key={index} className="mr-1">{pieceIcons[piece]}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapturedPieces;
